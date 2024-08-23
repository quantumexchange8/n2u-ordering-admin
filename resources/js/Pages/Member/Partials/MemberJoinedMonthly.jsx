import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
];

const years = [
    {
        label: '2024',
        value: '2024'
    },
];

export default function MemberJoinedMonthly() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const fetchData = async () => {
        try {

            const response = await axios.get('/member/getMemberJoined', {
                params: {
                    year: selectedYear,
                    month: selectedMonth,
                },
            });
            
            const chartData = {
                labels: response.data.days, // Array of days or any other x-axis label
                datasets: [
                    {
                        label: 'Members Joined',
                        data: response.data.counts, // Array of counts corresponding to the labels
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            setData(chartData);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
      }, [selectedYear, selectedMonth]);

    useEffect(() => {
        if (!isLoading) {
        }
    }, [isLoading, data]);

    const onSelect = (year) => {
        setSelectedYear(year);
    };

    const onSelectMonth = (month) => {
        setSelectedMonth(month);
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <select onChange={(e) => onSelect(e.target.value)} value={selectedYear}>
                    {years.map((year) => (
                        <option key={year.value} value={year.value}>
                            {year.label}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => onSelectMonth(e.target.value)} value={selectedMonth}>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {!isLoading ? (
                    <Bar data={data} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}