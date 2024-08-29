import React from "react";
import CaloriesAndSugarGoal from "./CaloriesAndSugarGoal";
import FoodLogTable from "./FoodLogTable";
import ApexChart from "./ApexChart";
const FoodLog = () => {
    return (
        <>
            <div className="container-fluid my-3">
                <div className="">
                    <CaloriesAndSugarGoal />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 md:my-5 lg:my-5">
                    <div className="md:cols-span-12 lg:cols-span-6">
                        <FoodLogTable />
                    </div>
                    <div className="md:cols-span-12 lg:cols-span-6">
                        <ApexChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodLog;
