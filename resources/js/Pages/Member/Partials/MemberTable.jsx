import { DeleteIcon, EditIcon, SyncIcon } from "@/Components/Icon/Outline";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from "@/Components/Button";
import { formatDate } from "@/Composables/index"
import { Link } from "@inertiajs/react";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Active, Inactive } from "@/Components/Badge";


export default function MemberTable() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [selectedId, setSelectedId] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);

    const fetchData = async () => {
        try {

            const response = await axios.get('/member/getMemberDetails');
            
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

    const ActionTemplate = (details) => {

        return (
            <div className="flex justify-center items-center gap-3">
                <Link href={`/member/member-details/${details.id}`}>
                    <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" >
                        <EditIcon />
                    </div>
                </Link>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => DeleteModal(details.id)} >
                    <DeleteIcon />
                </div>
            </div>
        );
    };

    const RankingTemplate = (details) => {

        return (
            <div className="flex">
               {details.rank.name}
            </div>
        );
    }

    // const EmailTemplate = (details) => {

    //     return (
    //         <div className="flex">
    //            {details.email != null ? details.email : '-'} 
    //         </div>
    //     );
    // }

    // const DobTemplate = (details) => {

    //     return (
    //         <div className="flex">
    //            {details.dob != null ? details.dob : '-'} 
    //         </div>
    //     );
    // }

    const NameTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                <div>
                    <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                </div>
                <div>
                    {details.name}
                </div>
            </div>
        );
    }

    const PointTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                {details.point}pts
            </div>
        );
    }

    const JoinedTemplate = (details) => {
        return (
            <div className="flex items-center gap-2">
                {formatDate(details.created_at)}
            </div>
        );
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const SyncCustomer = async () => {

        setProcessing(true);

        try {

            await axios.post('/fetch-customer');

            toast.success('Sync successfully.', {
                title: 'Sync successfully.',
                duration: 3000,
                variant: 'variant3',
            });

        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setProcessing(false); // Reset processing state after request completes
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <div>
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
                <div>
                    <Button 
                        size="sm" 
                        iconOnly 
                        className="flex items-center gap-2 p-2.5"
                        onClick={SyncCustomer}
                        disabled={processing}
                    >
                        <SyncIcon className={`${processing ? 'animate-spin' : ''}`}/>
                        <span>Sync Customer</span>
                    </Button>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const StatusTemplate = (details) => {
        
        return (
            <div className="flex flex-col">
                {
                    details.status === '0' ? (
                        <div>
                            <Active />
                        </div>
                    ) : (
                        <div>
                            <Inactive />
                        </div>
                    )
                }
            </div>
        )
    }

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const DeleteModal = (details) => {
        setSelectedId(details)
        confirmDialog({
            group: 'delete',
            message: 'Are you sure you want to Delete this user?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: confirmDelete,
            reject: rejectDelete,
            
        });
    }
    

    const confirmDelete = async () => {
        try {
            await axios.post('/member/deleteMember', {       
                id:selectedId,
            });
           
            handleItemAdded();

            toast.success('Approved.', {
                title: 'Approved.',
                duration: 3000,
                variant: 'variant3',
            });
            
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const rejectDelete = () => {
        
    }
    
    return (
        <div className="flex flex-col">
            <div></div>
            {
            data.length > 0 ? (
            <div>
                <DataTable value={data} removableSort paginator rows={8} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                    <Column field="name" header="Member" body={NameTemplate} style={{ minWidth: '70px'}} sortable></Column>
                    <Column field="phone" header="Phone" style={{ minWidth: '70px' }}></Column>
                    <Column field="point" header="Points" body={PointTemplate} style={{ minWidth: '70px' }}></Column>
                    {/* <Column field="email" header="Email" body={EmailTemplate} style={{ minWidth: '70px' }}></Column>
                    <Column field="dob" header="Date or Birth" body={DobTemplate} style={{ minWidth: '80px' }}></Column> */}
                    <Column field="rank" header="Ranking" body={RankingTemplate} style={{ minWidth: '80px' }} sortable></Column>
                    <Column field="created_at" header="Joined Date" body={JoinedTemplate} style={{ minWidth: '80px' }} sortable></Column>
                    <Column field="status" header="Status" body={StatusTemplate} style={{ maxWidth: '70px'}}></Column>
                    <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                </DataTable>
            </div>
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
                                No Available Option
                            </div>
                        )
                    }
                </div>
            )
        }

            <ConfirmDialog 
                group="delete"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg max-w-[300px] bg-white">
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
                                    rejectDelete();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    confirmDelete();
                                }}
                                variant="red"
                                size='sm'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Delete</Button>
                        </div>
                    </div>
                )}
            />
        </div>
        
    )
}