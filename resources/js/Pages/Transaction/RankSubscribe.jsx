import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import Tooltip from "@/Components/Tooltip";
import { CheckIcon, EditIcon, XIcon2 } from "@/Components/Icon/Outline";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Button from "@/Components/Button";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { EmptyDatasImg } from "@/Components/Icon/Brand";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export default function RankSubsribe() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [remark, setRemark] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const fetchData = async () => {
        try {

            const response = await axios.get('/transaction/getPendingRank');
            
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

    const acceptApproval = async () => {
        
        try {
            await axios.post('/transaction/approvePendingRank', {
                id: selectedId,
            });

            toast.success('Succesfull Upgraded', {
                title: 'Succesfull Upgraded',
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

    const ApproveUpgrade = (id) => {
        setSelectedId(id)

        confirmDialog({
            group: 'approval',
            message: 'Are you sure you want to Upgrade this user?',
            header: 'Confirm Upgrade',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: acceptApproval,
            reject: rejectApproval,
            
        });
    }

    const RejectUpgrade = (id) => {
        setSelectedId(id)

        confirmDialog({
            group: 'reject',
            message: 'Are you sure you want to Reject this user?',
            header: 'Reject upgrade',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: reject,
            reject: cancelReject,
            
        });
    }

    const reject = async () => {
        try {
            await axios.post('/transaction/rejectPendingRank', {
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


    const userDetails = (rowData) => {
        return (
            <div className="flex flex-col">
                {rowData.user.name}
            </div>
        )
    }

    const rankDetails = (rowData) => {
        return (
            <div className="flex flex-col">
                <div>{rowData.rank.name}</div>
            </div>
        )
    }

    const ActionTemplate = (data) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => ApproveUpgrade(data.id)}>
                    <Tooltip text='Approve'>
                        <CheckIcon className='text-green-600'/>
                    </Tooltip>
                </div>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => RejectUpgrade(data.id)}>
                    <Tooltip text='Reject'>
                        <XIcon2 className='text-red-600'/>
                    </Tooltip>
                </div>
                {/* <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => openModal(data)}>
                    <Tooltip text='View Details'>
                        <EditIcon />
                    </Tooltip>
                </div> */}
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

    return(
        <>
            <div className="w-full">
                {
                    data.length > 0 ? (
                        <DataTable value={data} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="user_id" header="User" body={userDetails}></Column>
                            <Column field="rank_id" header="Current Rank" body={rankDetails} ></Column>
                            {/* <Column field="transaction_number" header="Transaction" ></Column>
                            <Column field="created_at" header="Request Date" body={requestedDate}></Column>
                            <Column field="status" header="Status" body={statusBadge}></Column> */}
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
                                            No Pending Subscriber
                                        </div>
                                    )
                                }
                        </div>
                    )
                }
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
                            <div className="w-full">
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
        </>
    )
}