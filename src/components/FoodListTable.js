import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodList, editFoodList } from "../store/main/FoodThunk";
import { IoMdClose } from "react-icons/io";

const FoodListTable = () => {
    const { foodList } = useSelector((state) => state.Food);
    const dispatch = useDispatch();
    const [isEditModal, setIsEditModal] = useState(false);
    const [foodId, setFoodId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        carbs: "",
        fats: "",
        protein: "",
        sugar: "",
    });

    const handleDelete = (foodId) => {
        dispatch(deleteFoodList(foodId));
    };
    const handleEdit = (item) => {
        setFormData(item);
        setFoodId(item.id);
        setIsEditModal(true);
    };

    const closeModal = () => {
        setIsEditModal(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        await dispatch(editFoodList({ foodId, formData }));

        setIsEditModal(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.slice(0, 10),
        }));
    };
    return (
        <div className="flex flex-col rounded border-2">
            <div className="bg-gray-50 border-b-2 py-4 px-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold font-sans">
                            Food consumed today
                        </h1>
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
                                    return (
                                        <tr
                                            key={index}
                                            className="bg-white border-b"
                                        >
                                            <td className="px-6 py-6 font-medium whitespace-nowrap">
                                                {item?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.calories}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.carbs}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.fats}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.protein}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.sugar}g
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

                                                <button
                                                    className="py-3 px-3 bg-blue-400 text-white text-lg rounded md:ml-4 items-center"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    <FaEdit />
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
                                    value={formData.carbs}
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

export default FoodListTable;
