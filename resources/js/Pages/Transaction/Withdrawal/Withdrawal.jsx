import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EditIcon } from "@/Components/Icon/Outline";
import { formatDateTime } from "@/Composables";
import { Pending } from "@/Components/Badge";

export default function Withdrawal({ data }) {
    
    const ActionTemplate = (rank) => {
        return (
            <div className="flex justify-center">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer">
                    <EditIcon />
                </div>
            </div>
        );
    };

    const userDetails = (rowData) => {
        return (
            <div className="flex flex-col">
                {rowData.user.name}
            </div>
        )
    }

    const requestedDate = (rowData) => {
        
        return (
            <div className="flex flex-col">
                <div>{formatDateTime(rowData.created_at)}</div>
            </div>
        )
    }

    const statusBadge = (rowData) => {
        
        return (
            <div className="flex flex-col">
                <div>{rowData.status === 'pending' ? <Pending /> : '-'}</div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <DataTable value={data} tableStyle={{ minWidth: '160px' }}>
                <Column field="user_id" header="user" body={userDetails}></Column>
                <Column field="amount" header="Amount" ></Column>
                <Column field="transaction_number" header="Transaction" ></Column>
                <Column field="created_at" header="Request Date" body={requestedDate}></Column>
                <Column field="status" header="Status" body={statusBadge}></Column>
                <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
            </DataTable>
        </div>
    )
}