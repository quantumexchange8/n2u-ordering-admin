import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import Categories from "./Partials/Categories";

export default function MemberListing() {

    return (
        <Authenticated
            header="Categories"
        >
            <Head title="Categories" />

            <div className="flex flex-col gap-5">
                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <Categories />
                </div>
            </div>
        </Authenticated>
    )
}