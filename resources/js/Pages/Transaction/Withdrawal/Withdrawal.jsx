import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CheckIcon, EditIcon, XIcon, XIcon2 } from "@/Components/Icon/Outline";
import { formatDateTime, formatWallet } from "@/Composables";
import { Pending } from "@/Components/Badge";
import Tooltip from "@/Components/Tooltip";
import { useForm } from "@inertiajs/react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import toast from "react-hot-toast";
import Modal from "@/Components/Modal";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export default function Withdrawal({ data, fetchData }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [remark, setRemark] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [selectedWithdraw, setSelectedWithdraw] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const { datas, setData, post, processing, reset } = useForm({});

    const openModal = (data) => {
        setIsOpen(true)
        setSelectedWithdraw(data)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const acceptApproval = async () => {
        
        try {
            await axios.post('/transaction/approveTransaction', {
                id: selectedId,
            });

            toast.success('Approved.', {
                title: 'Approved.',
                duration: 3000,
                variant: 'variant3',
            });

            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const rejectApproval = () => {
        
    }

    const reject = async () => {
        try {
            await axios.post('/transaction/rejectTransaction', {
                id: selectedId,
                remark,
            });

            setRemark('');

            toast.success('Rejected.', {
                title: 'Rejected.',
                duration: 3000,
                variant: 'variant3',
            });

            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const cancelReject = () => {
        setRemark('');
    }

    const ApproveTransaction = (id) => {
        setSelectedId(id)

        confirmDialog({
            group: 'approval',
            message: 'Are you sure you want to Approve this transaction?',
            header: 'Approve',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: acceptApproval,
            reject: rejectApproval,
            
        });
    }

    const RejectTransaction = (id) => {
        setSelectedId(id)

        confirmDialog({
            group: 'reject',
            message: 'Are you sure you want to Reject this transaction?',
            header: 'Reject',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: reject,
            reject: cancelReject,
            
        });
    }

    const ActionTemplate = (data) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <Tooltip text='Approve'>
                    <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => ApproveTransaction(data.id)}>
                            <CheckIcon className='text-green-600'/>
                    </div>
                </Tooltip>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => RejectTransaction(data.id)}>
                    <Tooltip text='Reject'>
                        <XIcon2 className='text-red-600'/>
                    </Tooltip>
                </div>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => openModal(data)}>
                    <Tooltip text='View Details'>
                        <EditIcon />
                    </Tooltip>
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
                <DataTable value={data} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                    <Column field="user_id" header="user" body={userDetails}></Column>
                    <Column field="amount" header="Amount" ></Column>
                    <Column field="transaction_number" header="Transaction" ></Column>
                    <Column field="created_at" header="Request Date" body={requestedDate}></Column>
                    <Column field="status" header="Status" body={statusBadge}></Column>
                    <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                </DataTable>
            </div>

            <ConfirmDialog 
                group="approval"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div></div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro select-none" ref={headerRef}>
                                {message.header}
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center select-none' ref={contentRef}>
                                {message.message}
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    rejectApproval();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    acceptApproval();
                                }}
                                variant="green"
                                size='sm'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Confirm</Button>
                            
                        </div>
                    </div>
                )}
            />
        
            <ConfirmDialog 
                group="reject"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div></div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro select-none" ref={headerRef}>
                                {message.header}
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center select-none' ref={contentRef}>
                                {message.message}
                            </div>
                            <div className="w-full flex flex-col space-y-1">
                                <InputLabel value='Remark' /> 
                                <TextInput 
                                    className='w-full'
                                    type='text'
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    cancelReject();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                variant="red"
                                size='sm'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Confirm</Button>
                            
                        </div>
                    </div>
                )}
            />

            <Modal
                isOpen={isOpen}
                close={closeModal}
                title='View Details'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
            >
                <div className="flex flex-col px-3 py-2">
                    {selectedWithdraw && (
                        <div className="grid grid-cols-2 gap-3 items-center ">
                            <div className="max-w-20 text-sm">User name</div>
                            <div className="font-bold text-sm">{selectedWithdraw.user.name}</div>

                            <div className="max-w-20 text-sm">Wallet</div>
                            <div className="font-bold text-sm">{formatWallet(selectedWithdraw.wallet)}</div>

                            <div className="max-w-20 text-sm">Amount</div>
                            <div className="font-bold text-sm">RM {selectedWithdraw.amount}</div>

                            <div className="text-sm">Transaction Number</div>
                            <div className="font-bold text-sm">{selectedWithdraw.transaction_number}</div>

                            <div className="text-sm">Payment Method</div>
                            <div className="font-bold text-sm">{selectedWithdraw.payment_type}</div>

                            <div className="text-sm">Status</div>
                            <div className="font-bold text-sm">
                                {
                                    selectedWithdraw.status === 'pending' ? <Pending /> : selectedWithdraw.status === 'success' ? <Success /> : <Rejected />
                                }
                            </div>

                            <div className="text-sm">Requested Date</div>
                            <div className="font-bold text-sm">{formatDateTime(selectedWithdraw.created_at)}</div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}