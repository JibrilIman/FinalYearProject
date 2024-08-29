import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserDetail, updateUserDetail } from "../store/auth/authThunk";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import CalculateBMI from "./CalculateBMI";

function SugarAndCaloriesEditModal({
    toggle,
    showModal,
    sugarField,
    caloriesField,
}) {
    const dispatch = useDispatch();
    // Selectors
    const { user, refreshUser } = useSelector((state) => state.auth);

    // Initial Values
    const initialState = {
        sugar: refreshUser?.sugar ? refreshUser?.sugar : 0,
        calories: refreshUser?.calories ? refreshUser?.calories : 0,
    };

    //  States
    const [updateForm, setUpdateForm] = useState(initialState);
    const [loader, setLoader] = useState(false);
    const [showBMI, setShowBMI] = useState(false);

    // Functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const updatedData = {};
        if (refreshUser.sugar !== updateForm.sugar) {
            updatedData.sugar = updateForm.sugar;
        }
        if (refreshUser.calories !== updateForm.calories) {
            updatedData.calories = updateForm.calories;
        }
        // console.log("updatedData: ", updatedData);

        await dispatch(updateUserDetail({ id: user?.id, ...updatedData }));
        toast.success("Data updates Successfully");
        setLoader(false);
        toggle();
    };

    const handleBMICalculator = () => {
        setShowBMI(!showBMI);
    };

    // useEffects
    useEffect(() => {
        dispatch(refreshUserDetail(user?.id));
    }, []);

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

                    <div className="bg-white w-75 p-4 rounded-lg z-20 relative">
                        <span
                            className=" absolute top-0 right-0 cursor-pointer p-3"
                            onClick={() => toggle()}
                        >
                            <IoMdClose />
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-0 ">
                            <div className="cols-span-2 md:col-span-1">
                                <h2 className="text-xl font-bold md:mb-4">
                                    {`Update ${
                                        sugarField === true
                                            ? "Sugar"
                                            : "Calories"
                                    }`}
                                </h2>{" "}
                            </div>
                            {!sugarField && caloriesField && (
                                <div className="cols-span-2 md:col-span-1 text-end">
                                    <button
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                        onClick={handleBMICalculator}
                                    >
                                        Calculate Calories
                                    </button>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="w-full">
                            {caloriesField && (
                                <div className="mb-4">
                                    <label className="mb-1">Calories</label>
                                    <input
                                        type="number"
                                        id="calories"
                                        name="calories"
                                        value={updateForm?.calories}
                                        placeholder="2000"
                                        required
                                        className="w-full border border-gray-300 rounded p-2"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            {sugarField && (
                                <div className="mb-4">
                                    <label className="mb-1">Sugar</label>
                                    <input
                                        type="number"
                                        id="sugar"
                                        name="sugar"
                                        value={updateForm?.sugar}
                                        placeholder="30"
                                        required
                                        className="w-full border border-gray-300 rounded p-2"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            <div className="text-center">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                                        loader
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={loader}
                                >
                                    {loader === true ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        "Update"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <CalculateBMI
                handleBMICalculator={handleBMICalculator}
                showBMI={showBMI}
            />
        </>
    );
}
export default SugarAndCaloriesEditModal;
