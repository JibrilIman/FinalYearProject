import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

function ApexChart() {
    // useSelectors
    const { foodLog, foodList } = useSelector((state) => state.Food);

    // States
    const [piChartAvarge, setPieChartAvarge] = useState([0, 0, 0, 0]);
    console.log('>>>>piChartAvarge: ', piChartAvarge);

    const options = {
        chart: {
            type: "donut",
        },
        labels: ["Carbs  ", "Protien", "Fats"],
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    minAngleToShowLabel: 10,
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        colors: ["#000000"],
                    },
                },
            },
        },

        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
        tooltip: {
            y: {
                formatter: function (value) {
                    if (Number.isInteger(value)) {
                        return value; // Return integer value without decimal points
                    } else {
                        return value.toFixed(2); // Format values to two decimal points for non-integer values
                    }
                },
            },
        },
    };

    // for all carbs protein
    useEffect(() => {
        let totalTargated = 2000;
        let totalCarbs = 0;
        let totalProtein = 0;
        let totalFats = 0;
        let totalSugar = 0;

        foodLog?.forEach((food) => {
            const { foodId } = food;
            // find the foodId in food item array. if found change the item accordingly
            const foundFoodItem = foodList.find(
                (foodItem) => foodItem?.id === foodId
            );
            if (foundFoodItem) {
                totalCarbs += parseInt(foundFoodItem?.carbs);
                totalProtein += parseInt(foundFoodItem?.protein);
                totalFats += parseInt(foundFoodItem?.fats);
                totalSugar += parseInt(foundFoodItem?.sugar);
            }
        });
        console.log("totalCarbs: ", totalCarbs);
        const averageSugar = totalSugar / foodLog?.length;

        let percentageCarbs = (totalCarbs / totalTargated) * 100;
        let percentageProtein = (totalProtein / totalTargated) * 100;
        let percentageFats = (totalFats / totalTargated) * 100;
        const newArray = [percentageCarbs, percentageProtein, percentageFats];
        setPieChartAvarge(newArray);
        console.log("newArray: ", newArray);
    }, [foodLog, foodList]);
    return (
        <>
            <div className="w-full">
                {/* Card */}
                <div className="h-full rounded overflow-hidden shadow-md">
                    {/* Card Header */}
                    <div className="bg-gray-200 p-3">
                        <div className="font-bold text-xl">
                            Macronutrients Break down
                        </div>
                    </div>
                    {/* Card Header */}

                    {/* Card Body */}
                    <div className="p-3">
                        <div id="chart" className="flex justify-center py-4">
                            <ReactApexChart
                                options={options}
                                series={piChartAvarge}
                                type="donut"
                                width={400}
                            />
                        </div>
                    </div>
                    {/* Card Body */}
                </div>
                {/* Card */}
            </div>
        </>
    );
}

export default ApexChart;
