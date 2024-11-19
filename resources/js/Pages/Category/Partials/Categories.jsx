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
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import Modal from "@/Components/Modal";
import { NoAvailableData } from "@/Components/Icon/Brand";

export default function Categories() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const [selectedTrans, setSelectedTrans] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const fetchData = async () => {
        try {

            const response = await axios.get('/category/getCategory');
            
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

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const SyncCategory = async () => {

        setProcessing(true);
        try {
            await axios.post('/fetch-category', {
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
                </div>
                <div className="flex items-center">
                    <div>
                        <Button 
                            size="sm" 
                            iconOnly 
                            className="flex items-center gap-2 p-2.5"
                            onClick={SyncCategory}
                            disabled={processing}
                        >
                            <SyncIcon className={`${processing ? 'animate-spin' : ''}`}/>
                            <span>Sync Category</span>
                        </Button>                        
                    </div>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const customEmptyArrayMessage = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div>
                    <NoAvailableData />
                </div>
                <div className="font-semibold">
                    No Category Found
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col">
                {
                    data.length > 0 ? (
                        <div>
                            <DataTable 
                                value={data} 
                                removableSort 
                                paginator 
                                rows={8} 
                                tableStyle={{ minWidth: '160px' }} 
                                header={header} 
                                filters={filters}
                                selectionMode="single"
                                selection={selectedTrans}
                                dataKey="id"
                                scrollable
                            >
                                <Column field="id" header="Category ID" style={{ minWidth: '200px' }} sortable></Column>

                            </DataTable>
                        </div>
                    ) : (
                        <div>
                            <DataTable 
                                value={data} 
                                removableSort 
                                paginator 
                                rows={8} 
                                tableStyle={{ minWidth: '160px' }} 
                                header={header} 
                                filters={filters}
                                selectionMode="single"
                                selection={selectedTrans}
                                dataKey="id"
                                scrollable
                                emptyMessage={customEmptyArrayMessage}
                            >
                                <Column field="id" header="Category ID" style={{ minWidth: '200px' }} sortable></Column>

                            </DataTable>
                        </div>
                    )
                }
            </div>
        </>
    )

}