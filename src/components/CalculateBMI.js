import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

function CalculateBMI({ handleBMICalculator, showBMI }) {
    const [dropdownLoseGain, setDropdownLoseGain] = useState("loss");
    const [weightWantLose, setweightWantLose] = useState("");
    console.log("weightWantLose: ", weightWantLose);
    const [showBMIFields, setShowBMIFields] = useState(false);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [activityLevel, setActivityLevel] = useState(1.2);
    console.log('activityLevel: ', activityLevel);
    const [finalValue, setFinalValue] = useState(null);
    const [calculateBtn, setCalculateBtn] = useState(false);
    console.log("calculateBtn: ", calculateBtn);

    const activityOptions = [
        {
            option: "sedentary",
            value: 1.2,
        },
        {
            option: "lightly active",
            value: 1.375,
        },
        {
            option: "Moderately active",
            value: 1.55,
        },
        {
            option: "Very active",
            value: 1.725,
        },
        {
            option: "Extra active",
            value: 1.9,
        },
    ];

    const handleCalculate = (e) => {
        e.preventDefault();
        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);
        const ageYears = parseInt(age);

        if (!weight || !height || !age || !gender || !activityLevel) {
            toast.warn("All fields are Required");
            return;
        }
        setCalculateBtn(true);

        let bmr;
        if (gender === "male") {
            bmr =
                88.362 +
                13.397 * weightKg +
                4.799 * heightCm -
                5.677 * ageYears;
        } else if (gender === "female") {
            bmr =
                447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears;
        } else {
            throw new Error("Invalid gender specified");
        }
        const TDEE = bmr * activityLevel;
        let value;
        if (dropdownLoseGain === "loss") {
            value = TDEE - weightWantLose * 1000;
            setFinalValue(value.toFixed(2));
        } else if (dropdownLoseGain === "gain") {
            value = TDEE + weightWantLose * 1000;
            setFinalValue(value.toFixed(2));
        }
        setCalculateBtn(false);
    };

    const handleReset = () => {
        setDropdownLoseGain("loss");
        setweightWantLose("");
        setWeight("");
        setHeight("");
        setAge("");
        setGender("male");
        setActivityLevel(1);
        setFinalValue(null);
        setShowBMIFields(false);
    };

    useEffect(() => {
        if (!showBMI) {
            handleReset();
        }
    }, [showBMI]);

    useEffect(() => {
        if (dropdownLoseGain !== "" && weightWantLose !== "") {
            setShowBMIFields(true);
        }
    }, [, dropdownLoseGain, weightWantLose]);

    return (
        <>
            {/* <div className="container-fluid p-4"> */}
            {showBMI && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

                    <div className="bg-white w-75 md:p-5 p-3 rounded-lg z-20 relative lg:h-auto h-screen overflow-x-hidden">
                        <span
                            className="absolute top-0 right-0 cursor-pointer p-3"
                            onClick={handleBMICalculator}
                        >
                            <IoMdClose />
                        </span>
                        <form>
                            <h2 className="text-xl font-bold mb-4">
                                Your Goal
                            </h2>{" "}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between mb-4">
                                <div className="">
                                    <label htmlFor="">Weight (loss/gain)</label>
                                    <select
                                        value={dropdownLoseGain}
                                        onChange={(e) =>
                                            setDropdownLoseGain(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300  text-sm rounded-lg cursor-pointer focus:border-blue-500 block w-full p-2.5 outline-none"
                                        name="dropdownGain"
                                        id="dropdownGain"
                                    >
                                        <option value="loss">Loss</option>
                                        <option value="gain">Gain</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="flex items-center">
                                    <label>Weight to lose/gain per week (kg)</label>
                                    <div class="relative flex flex-row items-center group px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-5 h-5"  viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10" opacity=".35"></circle><path fill-rule="evenodd" d="M11,17v-5c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v5c0,0.552-0.448,1-1,1h0C11.448,18,11,17.552,11,17z"></path><circle cx="12" cy="7.5" r="1.5"></circle>
</svg>
		<div class="absolute bottom-0 flex flex-row items-center hidden mb-4 w-[250px] group-hover:flex ">
			<span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">Please consult a doctor when losing 1 kilogram a week or more, as it requires you to eat less than the recommended calories per day!</span>
		</div>
	</div>
    </div>
                                    <input
                                        type="number"
                                        id="weightLose"
                                        name="weightLose"
                                        value={weightWantLose}
                                        onChange={(e) =>
                                            setweightWantLose(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded px-2.5 py-2"
                                        placeholder="weight"
                                        required
                                    />
                                </div>
                            </div>
                            {showBMIFields && (
                                <>
                                    <h2 className="text-xl font-bold mb-4">
                                        Calculate BMI
                                    </h2>{" "}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between mb-4">
                                        <div className="">
                                            <label>Current Weight (kg)</label>
                                            <input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={weight}
                                                onChange={(e) =>
                                                    setWeight(e.target.value)
                                                }
                                                className="w-full border border-gray-300 rounded px-2.5 py-2"
                                                placeholder="your weight"
                                                required
                                            />
                                        </div>
                                        <div className="">
                                            <label>Current Height (cm)</label>
                                            <input
                                                type="number"
                                                id="height"
                                                name="height"
                                                value={height}
                                                onChange={(e) =>
                                                    setHeight(e.target.value)
                                                }
                                                placeholder="height"
                                                required
                                                className="w-full border border-gray-300 rounded px-2.5 py-2"
                                            />
                                        </div>
                                        <div className="">
                                            <label>Age (years)</label>
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={age}
                                                onChange={(e) =>
                                                    setAge(e.target.value)
                                                }
                                                placeholder="age"
                                                required
                                                className="w-full border border-gray-300 rounded px-2.5 py-2"
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="">Gender</label>
                                            <select
                                                value={gender}
                                                onChange={(e) =>
                                                    setGender(e.target.value)
                                                }
                                                className="bg-gray-50 border border-gray-300  text-sm rounded-lg cursor-pointer focus:border-blue-500 block w-full p-2.5 outline-none"
                                            >
                                                <option value="male">
                                                    Male
                                                </option>
                                                <option value="female">
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <label>Activity Level</label>
                                            <select
                                                value={activityLevel}
                                                onChange={(e) =>
                                                    setActivityLevel(
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-gray-50 border border-gray-300  text-sm rounded-lg cursor-pointer focus:border-blue-500 block w-full p-2.5 outline-none text-capitalize"
                                            >
                                                {activityOptions?.map(
                                                    (item) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.value
                                                                }
                                                                className="text-capitalize"
                                                            >
                                                                {item.option}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={(e) => handleCalculate(e)}
                                            disabled={calculateBtn}
                                        >
                                            {calculateBtn === true ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                "Calculate"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                        {finalValue !== null ? (
                            <div className="mt-4">
                                <p className="text-center font-bold">
                                    Suggested daily calorie intake for weight
                                    loss:{" "}
                                    <span className="text-red-600 font-bold">
                                        {finalValue} Calories
                                    </span>{" "}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
            {/* </div> */}
        </>
    );
}

export default CalculateBMI;
