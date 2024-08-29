import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { editFoodList, getFoodLog } from "../store/main/FoodThunk";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
const Table = ({
    foodList,
    handleDelete,
    showEditButton,
    showTodayPreviousbtn,
}) => {
    const getAllFoodList = useSelector((state) => state.Food.foodList);
    const { user } = useSelector((state) => state.auth);
    console.log(getAllFoodList, "J here");
    const dispatch = useDispatch();
    const [isEditModal, setIsEditModal] = useState(false);
    const [foodId, setFoodId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        calories: "",
        carbs: "",
        fats: "",
        protein: "",
        sugar: "",
    });

    const handleEdit = (id) => {
        const foodToEdit = foodList.find((food) => food.id === id);
        setEditFormData({
            name: foodToEdit.name,
            calories: foodToEdit.calories,
            carbs: foodToEdit.carbs,
            fats: foodToEdit.fats,
            protein: foodToEdit.protein,
            sugar: foodToEdit.sugar,
        });
        setFoodId(id);
        setIsEditModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const closeModal = () => {
        setIsEditModal(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        await dispatch(editFoodList({ foodId, editFormData }));

        setIsEditModal(false);
    };
    const handleTodayClick = () => {
        dispatch(getFoodLog({ filter: "today", uid: user?.uid }));
    };

    const handlePreviousClick = () => {
        dispatch(getFoodLog({ filter: "previous", uid: user?.uid }));
    };

    return (
        <div className="flex flex-col rounded border-2">
            <div className="bg-gray-50 border-b-2 py-4 px-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold font-sans">
                            Food consumed today
                        </h1>
                        <h1 className="text-xl font-bold font-sans text-blue-700">
                            {new Date().toDateString()}
                        </h1>
                    </div>
                    <div>
                        <span>
                            {showTodayPreviousbtn && (
                                <button
                                    className="bg-blue-500 py-3 px-3 ml-3 rounded text-white font-bold"
                                    onClick={handleTodayClick}
                                >
                                    Today
                                </button>
                            )}
                        </span>
                        <span>
                            {showTodayPreviousbtn && (
                                <button
                                    className="bg-blue-500 py-3 px-3 ml-3 rounded text-white font-bold"
                                    onClick={handlePreviousClick}
                                >
                                    Previous
                                </button>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="px-6 py-4 overflow-x-auto md:overflow-x-scroll">
                    {foodList?.length > 0 ? (
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
                                {foodList?.map((item, index) => {
                                    const foodItem = getAllFoodList?.find(
                                        (food) => {
                                            return food.id === item.foodId;
                                        }
                                    );
                                    return (
                                        <tr
                                            key={index}
                                            className="bg-white border-b"
                                        >
                                            <td className="px-6 py-6 font-medium whitespace-nowrap">
                                                {foodItem?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {foodItem?.calories}
                                            </td>
                                            <td className="px-6 py-4">
                                                {foodItem?.carbs}
                                            </td>
                                            <td className="px-6 py-4">
                                                {foodItem?.fats}
                                            </td>
                                            <td className="px-6 py-4">
                                                {foodItem?.protein}
                                            </td>
                                            <td className="px-6 py-4">
                                                {foodItem?.sugar}g
                                            </td>
                                            <td className="py-4 px-4">
                                                <button
                                                    className="py-3 px-3 bg-red-600 text-white text-lg rounded mb-4"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                                {showEditButton && (
                                                    <button
                                                        className="py-3 px-3 bg-blue-400 text-white text-lg rounded md:ml-4 items-center"
                                                        onClick={() =>
                                                            handleEdit(item.id)
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                )}
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
            {isEditModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

                    <div className="bg-white p-5 rounded-lg z-20 relative">
                        <span
                            className="absolute top-0 right-0 cursor-pointer p-3"
                            onClick={closeModal}
                        >
                            <IoMdClose />
                        </span>
                        <h2 className="text-xl font-bold mb-4">Edit Food</h2>{" "}
                        <form onSubmit={handleEditSubmit} className="w-full">
                            <div className="mb-4">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Calories</label>

                                <input
                                    type="number"
                                    id="calories"
                                    name="calories"
                                    value={editFormData.calories}
                                    onChange={handleChange}
                                    placeholder="Calories"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Carbs</label>
                                <input
                                    type="number"
                                    id="carbs"
                                    name="carbs"
                                    value={editFormData.carbs}
                                    onChange={handleChange}
                                    placeholder="Carbs"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Fats</label>
                                <input
                                    type="number"
                                    id="fats"
                                    name="fats"
                                    value={editFormData.fats}
                                    onChange={handleChange}
                                    placeholder="fats"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Protein</label>
                                <input
                                    type="number"
                                    id="protein"
                                    name="protein"
                                    value={editFormData.protein}
                                    onChange={handleChange}
                                    placeholder="Protein"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Sugar</label>
                                <input
                                    type="number"
                                    id="sugar"
                                    name="sugar"
                                    value={editFormData.sugar}
                                    onChange={handleChange}
                                    placeholder="Sugar"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                Update Food
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
