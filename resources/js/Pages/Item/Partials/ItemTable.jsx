import { useEffect } from "react";
import { useState } from "react";
import { NoAvailableData } from "@/Components/Icon/Brand";
import { EditIcon } from "@/Components/Icon/Outline";

export default function ItemTable({ selectedCategory  }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            {filterData.length > 0 ? (
                <div className="py-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filterData.map((item) => (
                        <div key={item.id} className="flex flex-col w-full border border-neutral-100 rounded-lg">
                            <div className="sm:h-[180px] md:h-[210px] lg:h-[216px] xl:h-[343px] flex items-center justify-center">                                
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
                                    <div className="text-neutral-900 text-base font-bold">{item.name}</div>
                                </div>
                                <div className="w-full h-auto min-h-[65px]">
                                    <div className="text-neutral-500 text-sm">{item.description}</div>
                                </div>
                            </div>
                            <div className="p-4 mt-auto flex justify-between items-center">
                                <div className="text-neutral-900 text-base font-bold">RM {item.price}</div>
                                <EditIcon></EditIcon>
                            </div>
                        </div>
                    ))
                    }
                </div>
                ) : (
                    customEmptyArrayMessage()
                )    
            }     
        
        </>
    )

}
