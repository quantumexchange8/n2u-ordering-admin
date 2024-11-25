import { useEffect } from "react";
import { useState } from "react";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { FilterMatchMode } from 'primereact/api';
import { SyncIcon } from "@/Components/Icon/Outline";
import toast from "react-hot-toast";
import { Tag } from "primereact/tag";

export default function ItemsListing({selectedCategory, handleFilter}) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const [categories, setCategories] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const fetchCategory = async () => {
        try {
            const response = await axios.get('/category/getCategory');
            setCategories(response.data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          } finally {
            setIsLoading(false);
          }  
    };

    useEffect(() => {
        fetchCategory();
    }, []);

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
        <>
            <div> 
                {header}
                <div className="flex space-x-4 p-6 rounded-lg overflow-y-hidden">
                    <Tag
                        key={""}
                        onClick={() => handleFilter(null)}
                        value="All"
                        className={`text-nowrap inline-flex text-sm h-10 px-4 py-2 text-neutral-900 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100 
                            ${selectedCategory === null ? "bg-neutral-100" : "bg-white"}`}                                
                    >   
                    </Tag>
                    {categories.map((category) => (
                    <Tag
                        key={category.id}
                        onClick={() => handleFilter(category.id)} 
                        value={category.name}
                        className={`text-nowrap inline-flex text-sm h-10 px-4 py-2 text-neutral-900 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100 
                            ${selectedCategory === category.id ? "bg-neutral-100" : "bg-white"}`}                                
                    >
                    </Tag>
                    ))} 
                </div>  
            </div>  
        </>
    )

}