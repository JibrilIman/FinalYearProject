import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserDetail } from "../store/auth/authThunk";
import SugarAndCaloriesEditModal from "./SugarAndCaloriesEditModal";

const CaloriesAndSugarGoal = () => {
    const dispatch = useDispatch();
    // useSelectors
    const { foodLog, foodList } = useSelector((state) => state.Food);
    const { user, refreshUser } = useSelector((state) => state.auth);

    // States
    const [totalSugar, setTotalSugar] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [sugarField, setSugarField] = useState(false);
    const [caloriesField, setCaloriesField] = useState(false);
    const [sugarAlertShown, setSugarAlertShown] = useState(false);
    const [caloriesAlertShown, setCaloriesAlertShown] = useState(false);

    let percentageSugar = ((totalSugar / refreshUser?.sugar) * 100).toFixed(2);
    let percentageCalories = (
        (totalCalories / refreshUser?.calories) *
        100
    ).toFixed(2);

    if (percentageSugar >= 100 && !sugarAlertShown) {
        alert("Your sugar consumption is high!");
        setSugarAlertShown(true);
    }

    // Ensure percentage does not exceed 100
    if (percentageCalories >= 100 && !caloriesAlertShown) {
        alert("Calories are completed");
        setCaloriesAlertShown(true);
    }

    // Functions
    const toggle = (type) => {
        if (type === "sugar") {
            setSugarField(true);
            setCaloriesField(false);
        } else {
            setCaloriesField(true);
            setSugarField(false);
        }
        setShowModal(!showModal);
    };

    // UseEffects
    useEffect(() => {
        if (foodLog) {
            // Calculate total sugar
            const totalSugar = foodLog.reduce((acc, food) => {
                const foundFoodItem = foodList.find(
                    (foodItem) => foodItem?.id === food.foodId
                );
                return acc + parseInt(foundFoodItem?.sugar);
            }, 0);

            setTotalSugar(totalSugar);

            // Calculate total Calories
            const totalCalories = foodLog.reduce((acc, food) => {
                const foundFoodItem = foodList.find(
                    (foodItem) => foodItem?.id === food.foodId
                );
                return acc + parseInt(foundFoodItem?.calories);
            }, 0);

            setTotalCalories(totalCalories);
        }
    }, [foodLog, foodList]);

    useEffect(() => {
        dispatch(refreshUserDetail(user?.id));
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4 md:my-5 lg:my-5">
                <div className="md:cols-span-12 lg:cols-span-6">
                    {/* Card */}
                    <div className="h-full rounded overflow-hidden shadow-md">
                        {/* Card Header */}
                        <div className="bg-gray-200 grid grid-cols-12 justify-between content-center px-3 py-2">
                            <div className="col-span-8 font-bold text-md pt-2">
                                Maximum Sugar Level
                                <span className="text-blue-600">
                                    {" "}
                                    {refreshUser?.sugar} grams
                                </span>
                            </div>
                            <div className="col-span-4 text-end">
                                <button
                                    className="py-2 px-3 rounded text-white font-bold bg-blue-500 text-sm"
                                    onClick={() => toggle("sugar")}
                                >
                                    Edit Sugar
                                </button>
                            </div>
                        </div>
                        {/* Card Header */}

                        {/* Card Body */}
                        <div className="mx-3 my-4">
                            <div className="bg-gray-300 w-full rounded-full">
                                <div
                                    className="bg-blue-600 h-full text-white text-center rounded-full p-1"
                                    style={{
                                        width: `${
                                            percentageSugar >= 100.0
                                                ? "100.00"
                                                : percentageSugar
                                        }%`,
                                    }}
                                >
                                    {percentageSugar >= 100.0
                                        ? "100.00"
                                        : percentageSugar}
                                    %
                                </div>
                            </div>
                        </div>
                        {/* Card Body */}
                    </div>
                    {/* Card */}
                </div>

                <div className="md:cols-span-12 lg:cols-span-6">
                    {/* Card */}
                    <div className="h-full rounded overflow-hidden shadow-md">
                        {/* Card Header */}
                        <div className="bg-gray-200 grid grid-cols-12 justify-between content-center px-3 py-2">
                            <div className="col-span-8 font-bold text-md pt-2">
                                Daily Calories Goal 
                                <span className="text-blue-600">
                                    {" "}
                                    {refreshUser?.calories} calories
                                </span>
                            </div>
                            <div className="col-span-4 text-end">
                                <button
                                    className="py-2 px-3 rounded text-white font-bold bg-blue-500 text-sm"
                                    onClick={() => toggle("calories")}
                                >
                                    Edit Calories
                                </button>
                            </div>
                        </div>
                        {/* Card Header */}

                        {/* Card Body */}

                        <div className="mx-3 my-4">
                            <div className="bg-gray-300 w-full rounded-full">
                                <div
                                    className="bg-blue-600 h-full text-white text-center rounded-full p-1"
                                    style={{
                                        width: `${
                                            percentageCalories >= 100.0
                                                ? "100.00"
                                                : percentageCalories
                                        }%`,
                                    }}
                                >
                                    {percentageCalories >= 100.0
                                        ? "100.00"
                                        : percentageCalories}
                                    %
                                </div>
                            </div>
                        </div>
                        {/* Card Body */}
                    </div>
                    {/* Card */}
                </div>
            </div>

            <SugarAndCaloriesEditModal
                toggle={toggle}
                showModal={showModal}
                sugarField={sugarField}
                caloriesField={caloriesField}
            />
        </>
    );
};

export default CaloriesAndSugarGoal;
