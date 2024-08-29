import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
    addFoodLog,
    deleteFoodLog,
    getFoodList,
    getFoodLog,
} from "../store/main/FoodThunk";
import { refreshUserDetail } from "../store/auth/authThunk";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FoodLogTable = () => {
    const history = useHistory()
    // Dispatch
    const dispatch = useDispatch();

    // useSelector
    const { foodList, foodLog } = useSelector((state) => state.Food);
    const { user, refreshUser } = useSelector((state) => state.auth);
    // States
    const [selectedFoodLogId, setSelectedFoodLogId] = useState("");
    console.log(">>>>selectedFoodLogId: ", selectedFoodLogId);
    const [filterColor, setFilterColor] = useState("today");

    // Functions
    const handleTodayClick = () => {
        dispatch(getFoodLog({ filter: "today", uid: user?.uid }));
        setFilterColor("today");
    };

    const handlePreviousClick = () => {
        dispatch(getFoodLog({ filter: "previous", uid: user?.uid }));
        setFilterColor("previous");
    };

    const setFoodLogs = async (e) => {
        e.preventDefault();

        if (!selectedFoodLogId) {
            alert("No Food Selected");
            return; // No food selected
        }
        const foodLog = foodList.find((foodItemId) => {
            return foodItemId.id === selectedFoodLogId;
        });
        console.log(">>>foodLog: ", foodLog);
        if (!foodLog) {
            return; // Food not found in the list
        }

        await dispatch(addFoodLog({ selectedFoods: foodLog, uid: user?.uid }));
    };

    const handleDelete = (foodId) => {
        dispatch(deleteFoodLog(foodId));
    };

    // UseEffect
    useEffect(() => {
        if(user?.uid){
            if (foodList && !foodList.length) {
                dispatch(getFoodList(user.uid));
            }
            if (foodLog && !foodLog.length) {
                dispatch(getFoodLog({ filter: "today", uid: user?.uid }));
            }
        }else{
            history.push("/login")
        }
    }, [user?.uid]);

    useEffect(() => {
        dispatch(refreshUserDetail(user?.id));
    }, []);

    return (
        <div className="flex flex-col rounded border-2">
            <div className="bg-gray-50 border-b-2 py-4 px-6">
                <div className="flex justify-between">
                    <div className="w-full">
                        <h1 className="text-xl font-bold font-sans">
                            Select Food To add to the Food Log
                        </h1>
                        <form className="flex gap-2 py-4 ">
                            <select
                                value={selectedFoodLogId}
                                onChange={(e) =>
                                    setSelectedFoodLogId(e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300  text-sm rounded-lg cursor-pointer focus:border-blue-500 block w-full p-2.5 outline-none"
                            >
                                <option value="">Choose food here</option>
                                {foodList?.map((foodItem) => (
                                    <option
                                        key={foodItem.id}
                                        value={foodItem.id}
                                    >
                                        {foodItem.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
                                onClick={setFoodLogs}
                            >
                                Add Food
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="px-6 py-4 overflow-x-auto md:overflow-x-scroll">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-lg font-bold my-4">
                                Today Consume Food
                            </h1>
                            <h1 className="text-lg font-bold">
                                {new Date().toDateString()}
                            </h1>
                        </div>
                        <div className="flex items-end pb-4">
                            <span>
                                <button
                                    // className="bg-blue-500 py-2 px-3 ml-3 rounded text-white font-bold"
                                    className={` py-2 px-3 ml-3 rounded text-white font-bold ${
                                        filterColor === "today"
                                            ? "bg-blue-500"
                                            : "bg-gray-500"
                                    }`}
                                    onClick={handleTodayClick}
                                >
                                    Today
                                </button>
                            </span>
                            <span>
                                <button
                                    // className="bg-blue-500 py-2 px-3 ml-3 rounded text-white font-bold"
                                    className={` py-2 px-3 ml-3 rounded text-white font-bold ${
                                        filterColor === "previous"
                                            ? "bg-blue-500"
                                            : "bg-gray-500"
                                    }`}
                                    onClick={handlePreviousClick}
                                >
                                    Previous
                                </button>
                            </span>
                        </div>
                    </div>
                    {foodLog?.length > 0 ? (
                        <table className="w-full text-sm text-left rtl:text-right border">
                            <thead className="text-xs uppercase border-b-2 border-black">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Calories
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Carbs
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fats
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Protein
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sugar
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodLog &&
                                    foodLog?.map((item, index) => {
                                        const { foodId } = item;
                                        //find the foodid in food item array. if dfound chnage the item accordingly
                                        const foundFoodItem = foodList.find(
                                            (foodItem) =>
                                                foodItem?.id === foodId
                                        );
                                        return (
                                            <tr
                                                key={index}
                                                className="bg-white border-b"
                                            >
                                                <td className="px-6 py-6 font-medium whitespace-nowrap">
                                                    {foundFoodItem?.name}
                                                </td>
                                                <td className="px-6 ">
                                                    {foundFoodItem?.calories}
                                                </td>
                                                <td className="px-6 ">
                                                    {foundFoodItem?.carbs}
                                                </td>
                                                <td className="px-6 ">
                                                    {foundFoodItem?.fats}
                                                </td>
                                                <td className="px-6 ">
                                                    {foundFoodItem?.protein}
                                                </td>
                                                <td className="px-6 ">
                                                    {foundFoodItem?.sugar}g
                                                </td>
                                                <td className="px-4">
                                                    <button
                                                        className="p-2 bg-red-600 text-white text-lg rounded"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <p className="text-black font-semibold text-xl">
                                Food List is Empty
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodLogTable;
