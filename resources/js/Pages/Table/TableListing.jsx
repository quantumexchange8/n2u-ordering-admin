import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AddTable from "./Partials/AddTable";

export default function TableListing() {

    return (
        <Authenticated
            header='Table Listing'
        >
            <Head title="Table Listing" />

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div></div>
                    <div>
                        <AddTable />
                    </div>
                </div>

                <div>
                    {/* <VoucherTable rank={rank}/> */}
                </div>
            </div>

        </Authenticated>
    )
}