import { useEffect } from "react";
import { useState } from "react";
import { NoAvailableData } from "@/Components/Icon/Brand";
import { EditIcon } from "@/Components/Icon/Outline";
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';

export default function ItemTable({ categories, selectedCategory  }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleRight, setVisibleRight] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/food/getItem');
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

    const filterData = 
        !selectedCategory
            ? data : data.filter((item) => Number(item.category_id) === Number(selectedCategory));

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

    const handleItemClick = (item) => {
        const category = categories.find((categories) => Number(categories.id) === Number(item.category_id));
        setSelectedItem({ ...item, categoryName: category ? category.name : "N/A" });
        setVisibleRight(true);
    };

    const customHeader = () => {
        return (
            <div className="font-bold">
                Item Details
            </div>
        )
    }

    return (
        <>
            {filterData.length > 0 ? (
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {filterData.map((item) => (
                        <div key={item.id} className="flex flex-col w-full border border-neutral-100 rounded-lg">
                            <div className="bg-white rounded-tl-lg rounded-tr-lg h-[180px] md:h-[210px] lg:h-[216px] xl:h-[343px] flex items-center justify-center">                                
                                {item.image ? (
                                    <img src={item.image}
                                    alt="" 
                                    className=""/>
                                ) : (
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                                    alt="" 
                                    className="" />
                                )}
                            </div>
                            <div className="p-4 flex flex-col gap-1 h-auto">
                                <div className="flex flex-col w-full h-auto min-h-[50px] ">
                                    <div className="text-base font-bold">{item.name}</div>
                                </div>
                                <div className="w-full h-auto min-h-[65px]">
                                    <div className="text-neutral-500 text-sm">{item.description}</div>
                                </div>
                            </div>
                            <div className="p-4 mt-auto flex justify-between items-center">
                                <div className="text-base font-bold">RM {item.price}</div>
                                <div className="cursor-pointer" onClick={() => handleItemClick(item)}>
                                    <EditIcon />
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                ) : (
                    customEmptyArrayMessage()
                )    
            }

            <Sidebar visible={visibleRight} header={customHeader} position="right" onHide={() => setVisibleRight(false)} className="w-full md:w-[400px]" >

                <div className="flex items-center justify-center">                                
                    {selectedItem.image ? (
                        <img src={selectedItem.image}
                        alt="" 
                        className=""/>
                    ) : (
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                        alt="" 
                        className="" />
                    )}
                </div>

                <div className="text-base font-bold py-3">{selectedItem.name}</div>

                <div className="text-base py-3">{selectedItem.description}</div>
                
                <div className="divide-y place-content-center h-auto">
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-base">Status</div>
                        <div className="text-right">
                            {selectedItem.status === '0' ? <Badge value="Active" severity="success"></Badge> : <Badge value="Inactive" severity="danger"></Badge>}
                        </div>
                    </div>
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-base">Category</div>
                        <div className="text-right">{selectedItem.categoryName}
                        </div>
                    </div>
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-base text-left">Inventory</div>
                        <div className="text-right">{selectedItem.inventory}</div>
                    </div>
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-base text-left">Price</div>
                        <div className="text-right">RM {selectedItem.price}</div>
                    </div>
                </div>

            </Sidebar>
    
        </>
    )

}
