import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import TransactionTable from "./Partials/TransactionTable";


export default function OrderListing() {

    return (
        <Authenticated
            header="Transaction History"
        >
            <Head title="Transaction History" />

            <div className="flex flex-col gap-5">
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <TransactionTable/>
                </div>
            </div>
        </Authenticated>
    )
}