import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import OrderTable from "./Partials/OrderTable";


export default function OrderListing() {

    return (
        <Authenticated
            header="Order History"
        >
            <Head title="Order History" />

            <div className="flex flex-col gap-5">
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <OrderTable/>
                </div>
            </div>
        </Authenticated>
    )
}