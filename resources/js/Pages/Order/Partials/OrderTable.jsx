import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { FilterMatchMode } from 'primereact/api';
import { DeleteIcon, EditIcon, SyncIcon } from "@/Components/Icon/Outline";
import { Calendar } from 'primereact/calendar';
import { useForm } from "@inertiajs/react";
import { format, isValid, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

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
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
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
                        <Calendar  
                            value={dates}
                            onChange={(e) => setDates(e.value)}
                            selectionMode="range" 
                            readOnlyInput 
                            hideOnRangeSelection
                            showButtonBar
                            placeholder="mm/dd/yy-mm/dd/yy"
                            className="border border-neutral-100 rounded-lg hover:border-primary-500 focus:border-primary-500 focus:shadow-none focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <div>
                    <Button 
                        size="sm" 
                        iconOnly 
                        className="flex items-center gap-2 p-2.5"
                        onClick={SyncTransaction}
                        disabled={processing}
                    >
                        <SyncIcon className={`${processing ? 'animate-spin' : ''}`}/>
                        <span>Sync Transaction</span>
                    </Button>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const formatDate = (date) => {
        return date ? date.toISOString().split('T')[0] : ''; // Formats the date to 'yyyy-mm-dd'
    };

    return (
        <div className="flex flex-col">
            {
                orderData.length > 0 ? (
                    <div>
                        <DataTable value={orderData} removableSort paginator rows={8} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="name" header="Member" body={NameTemplate} style={{ minWidth: '70px'}} sortable></Column>
                            <Column field="phone" header="Phone" style={{ minWidth: '70px' }}></Column>
                            <Column field="point" header="Points" body={PointTemplate} style={{ minWidth: '70px' }}></Column>
                            <Column field="rank" header="Ranking" body={RankingTemplate} style={{ minWidth: '80px' }} sortable></Column>
                            <Column field="created_at" header="Joined Date" body={JoinedTemplate} style={{ minWidth: '80px' }} sortable></Column>
                            <Column field="status" header="Status" body={StatusTemplate} style={{ maxWidth: '70px'}}></Column>
                            <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                        </DataTable>
                    </div>
                ) : (
                    <div>
                        <DataTable value={orderData} removableSort paginator rows={8} tableStyle={{ minWidth: '160px' }} header={header} filters={filters}>
                            <Column field="created_at" header="Receipt Date"  style={{ minWidth: '80px' }} sortable></Column>
                            <Column field="point" header="Receipt ID"  style={{ minWidth: '70px' }}></Column>
                            <Column field="phone" header="Transaction ID" style={{ minWidth: '70px' }}></Column>
                            <Column field="point" header="Receipt Amount"  style={{ minWidth: '70px' }}></Column>
                            <Column field="name" header="Customer" style={{ minWidth: '70px'}}></Column>
                        </DataTable>
                    </div>
                )
            }
        </div>
    )

}