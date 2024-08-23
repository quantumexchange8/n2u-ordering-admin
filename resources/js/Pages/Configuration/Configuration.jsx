import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from "@/Components/Button";
import { EditIcon } from "@/Components/Icon/Outline";

export default function Configuration({ auth, rank }) {
    
    const ActionTemplate = (rank) => {
        return (
            <div className="flex justify-center">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer">
                    <EditIcon />
                </div>
            </div>
        );
    };

    return (
        <Authenticated
            user={auth.user}
            header="Configuration"
        >

            <Head title="Configuration" />

            <div className="flex flex-col">
                <div className="flex items-center gap-5">
                    <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-neutral-200 py-2">
                            <div className="text-base font-bold ">
                                Rank Setting
                            </div>
                            <div>
                                {/* <Button
                                    className="py-1 px-3 text-xs"
                                >
                                    
                                    Add
                                </Button> */}
                            </div>
                        </div>
                        <DataTable value={rank} tableStyle={{ minWidth: '160px' }}>
                            <Column field="setting_name" header="Name" style={{ minWidth: '70px'}}></Column>
                            <Column field="value" header="Amount" style={{ minWidth: '70px' }}></Column>
                            <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                        </DataTable>
                    </div>
                    <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                        <div className="text-base font-bold border-b border-neutral-200 py-2">
                            Commission Setting
                        </div>
                        <DataTable value={rank} tableStyle={{ minWidth: '160px' }}>
                            <Column field="setting_name" header="Name"></Column>
                            <Column field="value" header="Amount"></Column>
                            <Column field="value" header="Amount"></Column>
                        </DataTable>
                    </div>
                </div>
                <div></div>
            </div>

        </Authenticated>
    )
}