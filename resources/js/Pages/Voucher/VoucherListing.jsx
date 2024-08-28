import Button from "@/Components/Button";
import { PlusIcon } from "@/Components/Icon/Outline";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AddVoucher from "./Partials/AddVoucher";
import VoucherTable from "./Partials/VoucherTable";

export default function VoucherListing({ rank }) {

    return (

        <Authenticated
            header="Voucher Listing"
        >
            <Head title="Voucher" />

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div></div>
                    <div>
                        <AddVoucher rank={rank}/>
                    </div>
                </div>

                <div>
                    <VoucherTable rank={rank}/>
                </div>
            </div>
        </Authenticated>
    )
}