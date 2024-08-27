import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { formatDateTime } from "@/Composables";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import TextInput from "@/Components/TextInput";
import { Pending, Rejected, Success } from "@/Components/Badge";

export default function MemberTransactionTable({ user, transaction }) {

    const [selectedTab, setSelectedTab] = useState('Deposit');

    const [loading, setLoading] = useState(true);
    const filteredData = transaction.filter(item => item.transaction_type === selectedTab);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const NameTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                {details.user.name}
            </div>
        )
    }

    const RequestTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                {formatDateTime(details.created_at)}
            </div>
        )
    }
    const ApprovalTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                {details.transaction_date != null ? formatDateTime(details.transaction_date) : '-'}
            </div>
        )
    }

    const StatusTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                {
                    details.status === 'pending' && (
                        <Pending />
                    )
                }
                {
                    details.status === 'success' && (
                        <Success />
                    )
                }
                {
                    details.status === 'rejected' && (
                        <Rejected />
                    )
                }
            </div>
        )
    }

    const ActionTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                
            </div>
        )
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <TextInput 
                        value={globalFilterValue} 
                        onChange={onGlobalFilterChange} 
                        placeholder="Keyword Search"
                        withIcon
                        className='font-medium'
                    />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <>
            <div className="text-neutral-900 font-bold text-base py-2">
                Transaction History
            </div>
            <TabGroup className='flex flex-col' onChange={(index) => {setSelectedTab(index === 0 ? 'Deposit' : 'Withdrawal')}}>
                <TabList className="flex">
                    <Tab
                        className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                        <span className='px-1.5'>Deposit</span>
                    </Tab>
                    <Tab
                        className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                        <span className='px-2.5'>Withdrawal</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className="p-4">
                        <DataTable value={filteredData} removableSort paginator rows={5} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="name" header="Mmeber" body={NameTemplate} style={{ minWidth: '70px'}} sortable></Column>
                            <Column field="transaction_type" header="Type" style={{ minWidth: '70px'}}></Column>
                            <Column field="amount" header="Amount" style={{ minWidth: '70px'}} sortable></Column>
                            <Column field="status" header="Status" body={StatusTemplate} style={{ maxWidth: '70px'}}></Column>
                            <Column field="created_at" header="Requested Date" body={RequestTemplate} style={{ minWidth: '70px'}} sortable></Column>
                            <Column field="transaction_date" header="Approval Date" body={ApprovalTemplate} style={{ minWidth: '70px'}} sortable></Column>
                            {/* <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column> */}
                        </DataTable>
                    </TabPanel>
                    <TabPanel className="p-4">
                        <DataTable value={filteredData} removableSort paginator rows={5} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="name" header="Mmeber" body={NameTemplate} style={{ minWidth: '70px'}} sortable></Column>
                            <Column field="transaction_type" header="Type" style={{ minWidth: '70px'}}></Column>
                            <Column field="amount" header="Amount" style={{ minWidth: '70px'}}></Column>
                            <Column field="status" header="Status" body={StatusTemplate} style={{ minWidth: '70px'}}></Column>
                            <Column field="created_at" header="Requested Date" body={RequestTemplate} style={{ minWidth: '70px'}}></Column>
                            <Column field="transaction_date" header="Approval Date" body={ApprovalTemplate} style={{ minWidth: '70px'}}></Column>
                            {/* <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column> */}
                        </DataTable>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    )
}