import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDateTime } from "@/Composables";
import { ViewDetails, XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import { Calendar } from 'primereact/calendar';

export default function PointHistory() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const [dateFilterValue, setDateFilterValue] = useState('');

    const fetchData = async () => {
        try {

            const response = await axios.get('/member/getPointHistory');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initFilters();
        fetchData();
    }, []);

    const ViewPoint = (pointDetail) => {
        setIsOpen(true);
        setSelectedPoint(pointDetail);
    }

    const closePoint = () => {
        setIsOpen(false);

    }

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'user.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            type: { value: null, matchMode: FilterMatchMode.IN },
            amount: { value: null, matchMode: FilterMatchMode.IN },
            earning_point: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            old_point: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            new_point: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }

        });
        setGlobalFilterValue('');
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
    
    const ActionTemplate = (data) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => ViewPoint(data)}>
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

    const onDateFilterChange = (e) => {
        const dateRange = e.value;
        let _filters = { ...filters };
        
        if (dateRange && dateRange[0] && dateRange[1]) {
            const startDateObj = new Date(dateRange[0]);
            
            const startDate = startDateObj.getFullYear() + '-' +
                        String(startDateObj.getMonth() + 1).padStart(2, '0') + '-' +
                        String(startDateObj.getDate()).padStart(2, '0') + ' ' +
                        String(startDateObj.getHours()).padStart(2, '0') + ':' +
                        String(startDateObj.getMinutes()).padStart(2, '0') + ':' +
                        String(startDateObj.getSeconds()).padStart(2, '0');
            console.log('1', startDate)

            const endDateObj = new Date(dateRange[1]);
            
            endDateObj.setHours(23,59,59);
            dateRange[1] = endDateObj;
            const endDate = endDateObj.getFullYear() + '-' +
                        String(endDateObj.getMonth() + 1).padStart(2, '0') + '-' +
                        String(endDateObj.getDate()).padStart(2, '0') + ' ' +
                        String(endDateObj.getHours()).padStart(2, '0') + ':' +
                        String(endDateObj.getMinutes()).padStart(2, '0') + ':' +
                        String(endDateObj.getSeconds()).padStart(2, '0');
            console.log('2', endDate)              

            _filters['global'] = {
                value: [startDate, endDate],
                matchMode: 'between'
            };
            console.log(dateRange,startDate,endDate);
        } else {
            // Reset filter if no date range is selected
            _filters['global'] = {
                value: null,
                matchMode: 'between'
            };
        }
    
        setFilters(_filters);
        setDateFilterValue(dateRange);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
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
                <Calendar 
                    value={dateFilterValue}
                    onChange={onDateFilterChange}
                    dateFormat="dd M yy"
                    selectionMode="range"
                    placeholder="Filter Date"
                    readOnlyInput
                    hideOnRangeSelection
                    showButtonBar
                />
                
            </div>
        )
    };

    const header = renderHeader();

    return (
        <>
            <div className="w-full">
                {
                    data.length > 0 ? (
                        <DataTable value={data} removableSort tableStyle={{ minWidth: '160px' }} header={header} filters={filters} globalFilterFields={['user.name','type','amount','earning_point','old_point','new_point','created_at']}>
                            <Column field="name" header="Member" body={userDetails} filterField="user.name"></Column>
                            <Column field="type" header="type" body={(rowData) => rowData.type.charAt(0).toUpperCase() + rowData.type.slice(1)}></Column>
                            <Column field="amount" header="amount" body={(rowData)=>`$${rowData.earning_point}`}></Column>
                            <Column field="earning_point" header="Earning Points" body={(rowData)=>`${rowData.earning_point}pts`}></Column>
                            <Column field="old_point" header="Current Points" body={(rowData)=>`${rowData.old_point}pts`}></Column>
                            <Column field="new_point" header="New Points" body={(rowData)=>`${rowData.new_point}pts`}></Column>
                            <Column field="created_at" header="Requested Date" body={requestedDate} sortable></Column>
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
                                            No Point History
                                        </div>
                                    )
                                }
                            </div>
                    )
                }
            </div>
        
            <Modal
                isOpen={isOpen}
                close={closePoint}
                title='View Details'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
            >
                <div className="flex flex-col px-3 py-2">
                    {
                        selectedPoint && (
                            <div className="grid grid-cols-2 gap-3 items-center ">
                                <div className="max-w-20 text-sm">User name</div>
                                <div className="font-bold text-sm">{selectedPoint.user.name}</div>

                                <div className="max-w-20 text-sm">Type</div>
                                <div className="font-bold text-sm">{selectedPoint.type}</div>

                                <div className="max-w-20 text-sm">Amount</div>
                                <div className="font-bold text-sm">${selectedPoint.amount}</div>

                                <div className="text-sm">Earning Point</div>
                                <div className="font-bold text-sm">{selectedPoint.earning_point}pts</div>

                                <div className="text-sm">Current Point</div>
                                <div className="font-bold text-sm">{selectedPoint.old_point}pts</div>

                                <div className="text-sm">New Point</div>
                                <div className="font-bold text-sm">{selectedPoint.new_point}pts</div>

                                <div className="text-sm">Requested Date</div>
                                <div className="font-bold text-sm">{formatDateTime(selectedPoint.created_at)}</div>
                            </div>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}