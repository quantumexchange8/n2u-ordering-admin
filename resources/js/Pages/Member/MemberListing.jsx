import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import MemberTable from "./Partials/MemberTable";
import MemberJoinedMonthly from "./Partials/MemberJoinedMonthly";

export default function MemberListing() {

    return (
        <Authenticated
            header="Member Listing"
        >
            <Head title="Member Listing" />

            <div className="flex flex-col gap-5">
                {/* Graph */}
                {/* <div className="flex flex-row gap-5"> */}
                    {/* <div className="w-full p-4 shadow-container bg-[#FFFEF8] md:shadow-container rounded-xl flex flex-col gap-3">
                        <MemberJoinedMonthly />
                    </div>
                    <div className="w-full p-4 shadow-container bg-[#FFFEF9] md:shadow-container rounded-xl flex flex-col gap-3">

                    </div> */}
                {/* </div> */}
                {/* member table */}
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <MemberTable />
                </div>
            </div>
        </Authenticated>
    )
}