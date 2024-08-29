import React, { useEffect, useState } from "react";
import Table from "./Table";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
    addFoodList,
    deleteFoodList,
    getFoodList,
} from "../store/main/FoodThunk";
import FoodListTable from "./FoodListTable";

const FoodList = () => {
    const { foodList } = useSelector((state) => state.Food);
    const { user } = useSelector((state) => state.auth);
    console.log(user, "user");
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        carbs: "",
        fats: "",
        protein: "",
        sugar: "",
    });
    const [isModalOpen, setIsModalOpen] = useState();

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // form handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.slice(0, 10),
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.uid, formData, "userod with dorm data");
        await dispatch(addFoodList({ formData, uid: user?.uid }));
        setFormData({
            name: "",
            calories: "",
            carbs: "",
            fats: "",
            protein: "",
            sugar: "",
        });
        setIsModalOpen(false);
    };
    useEffect(() => {
        console.log(user.uid, "userid");
        dispatch(getFoodList(user.uid));
    }, [user.uid]);

    const handleDelete = (foodId) => {
        dispatch(deleteFoodList(foodId));
    };
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

    return (
        <div className="container-fluid p-4 ">
            <div className="flex justify-end mb-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Food
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

                    <div className="bg-white p-5 rounded-lg z-20 relative">
                        <span
                            className=" absolute top-0 right-0 cursor-pointer p-3"
                            onClick={closeModal}
                        >
                            <IoMdClose />
                        </span>
                        <h2 className="text-xl font-bold mb-4">Add New Food</h2>{" "}
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="mb-4">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
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
                                    value={formData.calories}
                                    onChange={handleChange}
                                    placeholder=" Calories"
                                    maxlength="5"
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
                                    value={formData.carbs}
                                    onChange={handleChange}
                                    placeholder="carbs"
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
                                    value={formData.fats}
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
                                    value={formData.protein}
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
                                    value={formData.sugar}
                                    onChange={handleChange}
                                    placeholder="sugar"
                                    required
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                Add Food
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <FoodListTable />
            <Table
                foodList={foodList}
                handleDelete={handleDelete}
                showEditButton={true}
                showTodayPreviousbtn={false}
            />
        </div>
    );
};

export default FoodList;
