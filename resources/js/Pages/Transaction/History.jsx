import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function History() {

    return (
        <Authenticated header="Transaction">

            <Head title="History"/>
        </Authenticated>
    )
}