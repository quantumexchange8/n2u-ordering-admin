import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";


export default function Configuration({ auth }) {

    return (
        <Authenticated
            user={auth.user}
            header="Configuration"
        >

            <Head title="Configuration" />

            

        </Authenticated>
    )
}