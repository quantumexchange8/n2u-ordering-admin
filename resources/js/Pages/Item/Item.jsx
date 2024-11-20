import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import Items from "./Partials/Items";

export default function Item() {

    return (
        <Authenticated
            header="Item"
        >
            <Head title="Item" />

            <div className="flex flex-col gap-5">
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <Items />
                </div>
            </div>
        </Authenticated>
    )
}