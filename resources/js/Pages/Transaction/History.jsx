import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from "react";
import WithdrawalHistory from "./Partials/WithdrawHistory";
import DepositHistory from "./Partials/DepositHistory";

export default function History() {

    const [selectedTab, setSelectedTab] = useState('Deposit');

    return (
        <Authenticated header="Transaction">

            <Head title="Transaction History"/>

            <div className="w-full">
                <TabGroup className="flex flex-col gap-5" onChange={(index) => {setSelectedTab(index === 0 ? 'Deposit' : 'Withdrawal')}}>
                    <TabList className="flex">
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Deposit
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Withdrawal
                        </Tab>
                    </TabList>

                    <TabPanels >
                        <TabPanel className="rounded-xl bg-white/5">
                            <div className="shadow-container bg-white/60 rounded-xl min-h-10 p-3">
                                <DepositHistory />
                            </div>
                        </TabPanel>
                        <TabPanel className="rounded-xl bg-white/5">
                            <div className="shadow-container bg-white/60 rounded-xl min-h-10 p-3">
                                <WithdrawalHistory />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </Authenticated>
    )
}