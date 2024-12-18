import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { FilterMatchMode } from 'primereact/api';
import { DeleteIcon, EditIcon, SyncIcon, XIcon } from "@/Components/Icon/Outline";
import { Calendar } from 'primereact/calendar';
import { useForm } from "@inertiajs/react";
import { format, isValid, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import toast from "react-hot-toast";
import Modal from "@/Components/Modal";
import { formatDateTime24H } from "@/Composables";
import { Badge } from 'primereact/badge';
import { NoAvailableData } from "@/Components/Icon/Brand";
        
export default function OrderTable() {

    const formatToDBDateTime = (date, time = { hours: 0, minutes: 0, seconds: 0 }) => {
        if (!date || !isValid(date)) return null;  // Ensure the date is valid
    
        // Set the date to the specified time (default is 00:00:00)
        const dateTime = setSeconds(setMinutes(setHours(date, time.hours), time.minutes), time.seconds);
        return format(dateTime, 'yyyy-MM-dd HH:mm:ss');
    };

    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const [dateFilterValue, setDateFilterValue] = useState('');
    const [dates, setDates] = useState(null);
    const [selectedTrans, setSelectedTrans] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        created_at: { 
            value: dates ? dates.map(date => formatToDBDateTime(date)) : null, // Set the initial filter value or null
            matchMode: FilterMatchMode.BETWEEN 
        }
    });

    const fetchData = async () => {
        try {

            const response = await axios.get('/order/getOrderTransaction');
            
            setOrderData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { data, setData, post, errors, reset } = useForm({
        start_date: '',
        end_date: '',
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const SyncTransaction = async () => {

        setProcessing(true);

        try {

            await axios.post('/fetch-transaction', {
                start_date: format(dates[0], 'yyyy-MM-dd') + ' 00:00:00',  // Start date at 00:00:00
                end_date: format(dates[1], 'yyyy-MM-dd') + ' 23:59:59',    // End date at 23:59:59
            });

            fetchData()

            toast.success('Sync successfully.', {
                title: 'Sync successfully.',
                duration: 3000,
                variant: 'variant3',
            });

        } catch (error) {
            console.error('Error updating status:', error);

            toast.error('Failed to sync.', {
                title: 'Failed to sync.',
                description: 'No date is selected',
                duration: 3000,
                variant: 'variant1',
            });

        } finally {
            setProcessing(false); // Reset processing state after request completes
        }
    }

    const onDateChange = (e) => {
        const selectedDates = e.value; // Get selected dates
        
        // Set the start date to 'yyyy-MM-dd 00:00:00'
        const startDate = selectedDates[0]
            ? formatToDBDateTime(selectedDates[0], { hours: 0, minutes: 0, seconds: 0 })
            : null;
    
        // Set the end date to 'yyyy-MM-dd 23:59:59'
        const endDate = selectedDates[1]
            ? formatToDBDateTime(selectedDates[1], { hours: 23, minutes: 59, seconds: 59 })
            : null;
    
        setData('start_date', startDate);
        setData('end_date', endDate);
    
        setDates(selectedDates); // Update selected dates in state
    
        // Format the dates and set them for filtering in DB format
        setFilters((prevFilters) => ({
            ...prevFilters,
            created_at: {
                value: selectedDates && selectedDates.length > 0
                    ? selectedDates.map(date => formatToDBDateTime(date, { hours: 0, minutes: 0, seconds: 0 })).filter(date => date !== null)
                    : null,
                matchMode: 'between'
            },
        }));
    };
    

    const renderHeader = () => {
        return (
            <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between">
                <div className="flex gap-2 items-center">
                    <div className="w-full">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <TextInput 
                                value={globalFilterValue} 
                                onChange={onGlobalFilterChange} 
                                placeholder="Keyword Search"
                                withIcon
                                className='font-medium w-full'
                            />
                        </IconField>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
                    <div>
                        <Calendar  
                            value={dates}
                            onChange={(e) => setDates(e.value)}
                            selectionMode="range" 
                            readOnlyInput 
                            hideOnRangeSelection
                            showButtonBar
                            placeholder="mm/dd/yy-mm/dd/yy"
                            className="border border-neutral-100 rounded-lg w-full md:max-w-52 hover:border-primary-500 focus:border-primary-500 focus:shadow-none focus:outline-none focus:ring-0 md:rounded-tr-none md:rounded-br-none"
                            pt={{
                                root: 'md:rounded-tr-none md:rounded-br-none'
                            }}
                        />
                    </div>
                    <div>
                        <Button 
                            size="sm" 
                            iconOnly 
                            className="flex items-center justify-center md:justify-start gap-2 p-2.5 rounded-lg md:rounded-tr-md md:rounded-br-md md:rounded-tl-none md:rounded-bl-none w-full"
                            onClick={SyncTransaction}
                            disabled={processing}
                        >
                            <SyncIcon className={`${processing ? 'animate-spin' : ''}`}/>
                            <span>Sync Transaction</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const customerTemplate = (cust) => {

        return (
            <div>
                {
                    cust.cust_name ? (
                        <div>
                            { cust.cust_name }
                        </div>
                    ) : (
                        <div>
                            -
                        </div>
                    )
                }
            </div>
        )
    }

    const formatDate = (date) => {
        return date ? date.toISOString().split('T')[0] : ''; // Formats the date to 'yyyy-mm-dd'
    };

    const openModal = (data) => {
        setSelectedTrans(data); // Set the selected row data
        setIsOpen(true);   // Open the modal
      };
    
      const closeModal = () => {
        setSelectedTrans(null); // Clear the selected row data
        setIsOpen(false);  // Close the modal
      };

    const customEmptyArrayMessage = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div>
                    <NoAvailableData />
                </div>
                <div className="font-semibold">
                    No Order History Found
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col">
                {
                    orderData.length > 0 ? (
                        <div>
                            <DataTable 
                                value={orderData} 
                                removableSort 
                                paginator 
                                rows={8} 
                                tableStyle={{ minWidth: '160px' }} 
                                header={header} 
                                filters={filters}
                                selectionMode="single"
                                selection={selectedTrans}
                                onSelectionChange={(e) => openModal(e.value)}
                                dataKey="id"
                                scrollable
                            >
                                <Column field="receipt_start" header="Receipt Start" style={{ minWidth: '200px' }} sortable></Column>
                                <Column field="receipt_no" header="Receipt ID"  style={{ minWidth: '120px' }} sortable></Column>
                                <Column field="receipt_total" header="Receipt Amount (RM)"  style={{ minWidth: '160px' }} sortable></Column>
                                <Column field="receipt_grand_total" header="Receipt Grand Total (RM)"  style={{ minWidth: '190px' }} sortable></Column>
                                <Column field="reward_point" header="Reward Point (PTS)" style={{ minWidth: '140px' }} sortable></Column>
                                <Column field="cust_id" header="Customer" sortable body={customerTemplate} style={{ minWidth: '130px'}}></Column>
                            </DataTable>
                        </div>
                    ) : (
                        <div>
                            <DataTable 
                                value={orderData} 
                                removableSort 
                                paginator 
                                rows={8} 
                                tableStyle={{ minWidth: '160px' }} 
                                header={header} 
                                filters={filters}
                                selectionMode="single"
                                selection={selectedTrans}
                                onSelectionChange={(e) => openModal(e.value)}
                                dataKey="id"
                                scrollable
                                emptyMessage={customEmptyArrayMessage}
                            >
                                <Column field="receipt_start" header="Receipt Start" style={{ minWidth: '200px' }} sortable></Column>
                                <Column field="receipt_no" header="Receipt ID"  style={{ minWidth: '120px' }} sortable></Column>
                                <Column field="transaction_id" header="Transaction ID" style={{ minWidth: '140px' }} sortable></Column>
                                <Column field="receipt_total" header="Receipt Amount (RM)"  style={{ minWidth: '160px' }} sortable></Column>
                                <Column field="receipt_grand_total" header="Receipt Grand Total (RM)"  style={{ minWidth: '190px' }} sortable></Column>
                                <Column field="cust_id" header="Customer" body={customerTemplate} style={{ minWidth: '130px'}}></Column>
                            </DataTable>
                        </div>
                    )
                }
            </div>
            
            {
                selectedTrans && (
                    <Modal
                        isOpen={isOpen}
                        close={closeModal}
                        title={
                            <div className="flex items-center gap-3">
                                <div>
                                    <span>Receipt</span>  <span>#{selectedTrans.receipt_no}</span>
                                </div>
                                <div>
                                    {
                                        selectedTrans.voided !== '0' ? (
                                            <>
                                                {
                                                    selectedTrans.voided === '1' && (
                                                        <>
                                                            <span> </span><Badge value="VOIDED" severity="danger"></Badge>
                                                        </>
                                                    )
                                                }
                                                {
                                                    selectedTrans.voided === '2' && (
                                                        <Badge value="REFUND" severity="warning"></Badge>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            ''
                                        )
                                    }
                                </div>
                            </div>
                        }
                        closeIcon={<XIcon />}
                        maxWidth='md'
                        maxHeight='lg'
                        showFooter='hidden'
                    >
                        <div className="grid grid-cols-2 gap-2 p-5 ">
                            {/* <div className="text-sm">Receipt ID:</div>
                            <div className=" text-sm font-bold ">
                                {selectedTrans.receipt_no}
                            </div> */}

                            <div className="text-sm">Transaction ID:</div>
                            <div className=" text-sm font-bold">
                                {selectedTrans.transaction_id}
                            </div>

                            <div className="text-sm">Receipt Start:</div>
                            <div className=" text-sm font-bold">
                                {formatDateTime24H(selectedTrans.receipt_start)}
                            </div>

                            <div className="text-sm">Receipt End:</div>
                            <div className=" text-sm font-bold ">
                                {formatDateTime24H(selectedTrans.receipt_end)}
                            </div>

                            <div className="text-sm">Table ID:</div>
                            <div className=" text-sm font-bold ">
                                {selectedTrans.table_id}
                            </div>

                            <div className="text-sm">Pax No:</div>
                            <div className=" text-sm font-bold ">
                                {selectedTrans.pax_no}
                            </div>

                            <div className="text-sm">Customer:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.cust_name ? (
                                        <div>
                                            { selectedTrans.cust_name }
                                        </div>
                                    ) : (
                                        '-'
                                    )
                                }
                            </div>

                            <div className="text-sm">Phone:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.phone_no ? (
                                        <div>
                                            { selectedTrans.phone_no }
                                        </div>
                                    ) : (
                                        '-'
                                    )
                                }
                            </div>

                            <div className="text-sm">Discount Type:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.discount_type ? (
                                        <div>
                                            {
                                                selectedTrans.discount_type === '0' && (
                                                    <span>Percentage (%)</span>
                                                )
                                            }
                                            {
                                                selectedTrans.discount_type === '1' && (
                                                    <span>Exact Amount ($)</span>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <span>
                                            -
                                        </span>
                                    )
                                }
                            </div>

                            <div className="text-sm">Discount Amount:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.discount_type === '0' && (
                                        <span>
                                            {selectedTrans.discount_amount}%
                                        </span>
                                    )
                                }
                                {
                                    selectedTrans.discount_type === '1' && (
                                        <span>
                                            RM {selectedTrans.discount_amount}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="text-sm">Tips Type:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.tip_type ? (
                                        <div>
                                            {
                                                selectedTrans.tip_type === '0' && (
                                                    <span>Percentage (%)</span>
                                                )
                                            }
                                            {
                                                selectedTrans.tip_type === '1' && (
                                                    <span>Exact Amount ($)</span>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <span>
                                            -
                                        </span>
                                    )
                                }
                            </div>

                            <div className="text-sm">Tips Amount:</div>
                            <div className=" text-sm font-bold ">
                                {
                                    selectedTrans.tip_type === '0' && (
                                        <span>
                                            {selectedTrans.tip_amount}%
                                        </span>
                                    )
                                }
                                {
                                    selectedTrans.tip_type === '1' && (
                                        <span>
                                            RM {selectedTrans.tip_amount}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="col-span-2 py-5">
                                <div className="h-[1px] bg-slate-500"> </div>
                            </div>

                            <div className="text-sm ">Receipt Total:</div>
                            <div className=" text-sm font-bold text-right">
                                RM {selectedTrans.receipt_total}
                            </div>

                            <div className="text-sm">Discount Receipt Amount:</div>
                            <div className=" text-sm font-bold text-right">
                                RM {selectedTrans.discount_receipt_amount}
                            </div>

                            <div className="text-sm ">Receipt Rounding:</div>
                            <div className=" text-sm font-bold text-right">
                                RM {selectedTrans.rounding}
                            </div>

                            <div className="text-sm ">Receipt Grand Total:</div>
                            <div className=" text-sm font-bold text-right">
                                RM {selectedTrans.receipt_grand_total}
                            </div>

                            <div className="text-sm ">Reward Point:</div>
                            <div className=" text-sm font-bold text-right">
                                {selectedTrans.reward_point} PTS
                            </div>

                            {
                                selectedTrans.remark && (
                                    <>
                                        <div className="text-sm ">Remarks:</div>
                                        <div className=" text-sm font-bold text-right">
                                            {selectedTrans.remark}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </Modal>
                )
            }
        </>
    )

}