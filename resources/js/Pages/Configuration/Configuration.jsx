import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from 'react';
import NewConfig from "./Partials/NewConfig";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import NewTax from "./Partials/NewTax";

export default function Configuration({ auth, settings, taxes }) {

    return (
        <Authenticated
            user={auth.user}
            header="Configuration"
        >

            <Head title="Configuration" />
                <TabGroup className="flex flex-col gap-5">
                    <TabList className="flex">
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Member
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Tax
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <NewConfig settings={settings} />
                        </TabPanel>
                        <TabPanel>
                            <NewTax taxes={taxes} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>

        </Authenticated>
    )
}