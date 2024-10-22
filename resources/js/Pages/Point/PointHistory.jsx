import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import PointTable from "./Partials/PointTable";


export default function MemberListing() {

    return (
        <Authenticated
            header="Point History"
        >
            <Head title="Point History" />

            <div className="flex flex-col gap-5">
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <PointTable/>

                </div>
            </div>
        </Authenticated>
    )
}