import { useEffect } from "react";
import { useState } from "react";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { FilterMatchMode } from 'primereact/api';
import { SyncIcon } from "@/Components/Icon/Outline";
import toast from "react-hot-toast";
import { NoAvailableData } from "@/Components/Icon/Brand";
import { EditIcon } from "@/Components/Icon/Outline";
import { Tag } from "primereact/tag";

export default function Items() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

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
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('/item/getItem');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchData();
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

    const customEmptyArrayMessage = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div>
                    <NoAvailableData />
                </div>
                <div className="font-semibold">
                    No Item Found
                </div>
            </div>
        )
    };
    
    const handleFilter = (categoryId) => {
        const filteredItems  = data.filter((item) => Number(item.category_id) === categoryId);
        setFilterData(filteredItems);
        setSelectedCategory(categoryId);
    };

    return (
        <>
            <div className="flex flex-col">
                {
                    <div> 
                        {header}
                        <div className="flex space-x-4 p-6 rounded-lg overflow-y-hidden">
                            <Tag
                                key={""}
                                onClick={() => handleFilter("")}
                                value="All"
                                className={`text-nowrap inline-flex text-sm h-10 px-4 py-2 text-neutral-900 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100 
                                    ${selectedCategory === "" ? "bg-neutral-100" : "bg-white"}`}                                
                            >   
                            </Tag>
                            {categories.map((categories) => (
                            <Tag
                                key={categories.id}
                                onClick={() => handleFilter(categories.id)} 
                                value={categories.name}
                                className={`text-nowrap inline-flex text-sm h-10 px-4 py-2 text-neutral-900 border border-neutral-200 rounded-full shadow-input hover:bg-neutral-100 
                                    ${selectedCategory === categories.id ? "bg-neutral-100" : "bg-white"}`}                                
                            >
                            </Tag>
                            ))} 
                        </div>  
                    </div>
                }
            </div>
            <div className="flex flex-col">
            {selectedCategory ? (
                filterData.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filterData.map((item) => (
                        <div key={item.id} className="flex flex-col w-full border border-neutral-100 rounded-lg">
                            <div className="sm:h-[155px] md:h-[210px] lg:h-[216px] xl:h-[279px] flex items-center justify-center">                                {item.image ? (
                                        <img src={item.image}
                                        alt="" 
                                        className=""/>
                                    ) : ( 
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                                        alt="" 
                                        className="" />
                                    )}
                            </div>
                            <div className="p-3 flex flex-col gap-2 h-auto min-h-[110px]">
                                <div className="flex flex-col w-full h-full">
                                    <div className="text-neutral-900 text-sm font-bold">{item.name}</div>
                                </div>
                                <div className="w-full h-full">
                                    <div className="text-neutral-500 text-xs">{item.description}</div>
                                </div>
                            </div>
                            <div className="p-3 mt-auto flex justify-between items-center">
                                <div className="text-neutral-900 text-sm font-bold">RM {item.price}</div>
                                <EditIcon></EditIcon>
                            </div>

                        </div>
                    ))
                    }
                </div>
                ) : (
                    customEmptyArrayMessage()
                )          
            ) : (
                data.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {data.map((item) => (
                        <div key={item.id} className="flex flex-col w-full border border-neutral-100 rounded-lg">
                            <div className="md:h-[210px] lg:h-[216px] xl:h-[343px] flex items-center justify-center">
                                {item.image ? (
                                        <img src={item.image}
                                        alt="" 
                                        className=""/>
                                    ) : ( 
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                                        alt="" 
                                        className=""/>
                                    )}
                            </div>
                            <div className="p-3 flex flex-col gap-2 h-auto min-h-[110px]">
                                <div className="flex flex-col w-full h-full">
                                    <div className="text-neutral-900 text-sm font-bold">{item.name}</div>
                                </div>
                                <div className="w-full h-full">
                                    <div className="text-neutral-500 text-xs">{item.description}</div>
                                </div>
                            </div>
                            <div className="p-3 mt-auto flex justify-between items-center">
                                <div className="text-neutral-900 text-sm font-bold">RM {item.price}</div>
                                <EditIcon></EditIcon>
                            </div>
                        </div>
                    ))
                    }
                </div>
                ) : (
                    customEmptyArrayMessage()
                ))
            }
            </div>
        </>
    )

}