import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDateTime, formatWallet } from "@/Composables";
import { Pending, Rejected, Success } from "@/Components/Badge";
import { ViewDetails, XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";

export default function DepositHistory() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const fetchData = async () => {
        try {

            const response = await axios.get('/transaction/getDepositHistory');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const ViewDeposit = (depositDetail) => {
        setIsOpen(true);
        setSelectedDeposit(depositDetail);
    }

    const closeDeposit = () => {
        setIsOpen(false);

    }

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
                <div>{rowData.status === 'success' ? <Success /> : <Rejected />}</div>
            </div>
        )
    }
    
    const ActionTemplate = (data) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => ViewDeposit(data)}>
                    <ViewDetails />
                </div>
            </div>
        );
    };

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
            <div className="w-full">
                {
                    data.length > 0 ? (
                        <DataTable value={data} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="user_id" header="user" body={userDetails}></Column>
                            <Column field="amount" header="Amount" ></Column>
                            <Column field="transaction_number" header="Transaction" ></Column>
                            <Column field="created_at" header="Request Date" body={requestedDate}></Column>
                            <Column field="status" header="Status" body={statusBadge}></Column>
                            <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                        </DataTable>
                    ) : (
                            <div className="flex justify-center items-center h-[70vh]">
                                {
                                    isLoading ? (
                                        <l-zoomies
                                        size="150"
                                        stroke="5"
                                        bg-opacity="0.1"
                                        speed="1.0" 
                                        color="#F26522" 
                                        ></l-zoomies>
                                    ) : (
                                        <div>
                                            No Pending Deposit
                                        </div>
                                    )
                                }
                            </div>
                    )
                }
            </div>
        
            <Modal
                isOpen={isOpen}
                close={closeDeposit}
                title='View Details'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
            >
                <div className="flex flex-col px-3 py-2">
                    {
                        selectedDeposit && (
                            <div className="grid grid-cols-2 gap-3 items-center ">
                                <div className="max-w-20 text-sm">User name</div>
                                <div className="font-bold text-sm">{selectedDeposit.user.name}</div>

                                <div className="max-w-20 text-sm">Wallet</div>
                                <div className="font-bold text-sm">{formatWallet(selectedDeposit.wallet)}</div>

                                <div className="max-w-20 text-sm">Amount</div>
                                <div className="font-bold text-sm">RM {selectedDeposit.amount}</div>

                                <div className="text-sm">Transaction Number</div>
                                <div className="font-bold text-sm">{selectedDeposit.transaction_number}</div>

                                <div className="text-sm">Payment Method</div>
                                <div className="font-bold text-sm">{selectedDeposit.payment_type}</div>

                                <div className="text-sm">Status</div>
                                <div className="font-bold text-sm">
                                    {
                                        selectedDeposit.status === 'pending' ? <Pending /> : selectedDeposit.status === 'success' ? <Success /> : <Rejected />
                                    }
                                </div>
                                {
                                    selectedDeposit.status === 'rejected' && (
                                        <>
                                            <div className="text-sm">Remark</div>
                                            <div className="font-bold text-sm">{selectedDeposit.remark}</div>
                                        </>
                                    )
                                }

                                <div className="text-sm">Requested Date</div>
                                <div className="font-bold text-sm">{formatDateTime(selectedDeposit.created_at)}</div>

                                <div className="text-sm">Transaction Date</div>
                                <div className="font-bold text-sm">{formatDateTime(selectedDeposit.transaction_date)}</div>
                            </div>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}