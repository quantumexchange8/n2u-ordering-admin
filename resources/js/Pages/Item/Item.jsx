import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import {useEffect, useState } from "react";
import ItemsListing from "./Partials/ItemListing";
import ItemTable from "./Partials/ItemTable";

export default function Item() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
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

    const handleFilter = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <Authenticated header="Item">
            <Head title="Item" />
                <div className="flex flex-col">
                    <ItemsListing 
                        categories={categories}
                        selectedCategory={selectedCategory} 
                        handleFilter={handleFilter} 
                    />
                </div>
                <div className="flex flex-col">
                    <ItemTable
                        categories={categories}
                        selectedCategory={selectedCategory} 
                    />
                </div>
        </Authenticated>
    )
}