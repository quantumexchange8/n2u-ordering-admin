import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Deposit from "./Deposit/Deposit";
import { useState } from "react";
import { useEffect } from "react";
import Withdrawal from "./Withdrawal/Withdrawal";
import RankSubsribe from "./RankSubscribe";
// import PendingDepositTable from "./Partials/Deposit";

export default function Transaction({}) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [filteredData, setFilteredData] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Deposit');

    const fetchData = async () => {
        try {

            const response = await axios.get('/transaction/getPendingDeposit');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item => item.transaction_type === selectedTab);

    return (
        <Authenticated header="Pending">

            <Head title="Transaction" />

            <div className="w-full">
                <TabGroup className="flex flex-col gap-5" onChange={(index) => {setSelectedTab(index === 0 ? 'Deposit' : 'Withdrawal')}}>
                    <TabList className="flex">
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Pending Deposit
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Pending Withdrawal
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Pending Rank Subscribe
                        </Tab>
                    </TabList>

                    <TabPanels >
                        <TabPanel className="rounded-xl bg-white/5">
                            <div className="shadow-container bg-white/60 rounded-xl min-h-10 p-3">
                                <Deposit data={filteredData} fetchData={fetchData}/>
                            </div>
                        </TabPanel>
                        <TabPanel className="rounded-xl bg-white/5">
                            <div className="shadow-container bg-white/60 rounded-xl min-h-10 p-3">
                                <Withdrawal data={filteredData} fetchData={fetchData}/>
                            </div>
                        </TabPanel>
                        <TabPanel className="rounded-xl bg-white/5">
                            <div className="shadow-container bg-white/60 rounded-xl min-h-10 p-3">
                                <RankSubsribe />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </Authenticated>
    )
}