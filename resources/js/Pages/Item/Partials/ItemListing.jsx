import { useState } from "react";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { FilterMatchMode } from 'primereact/api';
import { SyncIcon } from "@/Components/Icon/Outline";
import toast from "react-hot-toast";
import { Tag } from "primereact/tag";

export default function ItemsListing({categories, selectedCategory, handleFilter}) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const SyncItem = async () => {
        setProcessing(true);
        try {
            await axios.post('/fetch-item', {
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
                            onClick={SyncItem}
                            disabled={processing}
                        >
                            <SyncIcon className={`${processing ? 'animate-spin' : ''}`}/>
                            <span>Sync Item</span>
                        </Button>                        
                    </div>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    
    return (
        <div className="flex flex-col gap-5">
            <div>
                {header}
            </div>
            <div className="flex items-center gap-3 py-2 rounded-lg overflow-y-hidden lg:max-w-screen-xl xl:max-w-[1440px]">
                <div
                    onClick={() => handleFilter(null)}
                    value="All"
                    className={` flex items-center font-bold select-none cursour-pointer text-sm h-10 px-4 py-2 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100
                        ${selectedCategory === null ? "bg-primary-500 text-white " : " bg-white text-black "}`}                                
                >  
                    <span >All</span>
                    
                </div>
                {
                    categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => handleFilter(category.id)} 
                            value={category.name}
                            className={`flex items-center font-bold select-none cursour-pointer text-sm h-10 px-4 py-2 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100 
                                ${selectedCategory === category.id ? "bg-primary-500 text-white " : "bg-white text-black "}`}                                
                        >
                            <div className="min-w-20 text-center">{category.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}