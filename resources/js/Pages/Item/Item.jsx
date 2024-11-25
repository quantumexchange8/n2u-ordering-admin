import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import {useState } from "react";
import ItemsListing from "./Partials/ItemListing";
import ItemTable from "./Partials/ItemTable";

export default function Item() {
    const [selectedCategory, setSelectedCategory] = useState(null); 

    const handleFilter = (categoryId) => {
        setSelectedCategory(categoryId);
        console.log(categoryId);
    };

    return (
        <Authenticated header="Item">
            <Head title="Item" />
                <div className="flex flex-col">
                    <ItemsListing 
                        selectedCategory={selectedCategory} 
                        handleFilter={handleFilter} 
                    />
                </div>
                <div className="flex flex-col">
                    <ItemTable 
                        selectedCategory={selectedCategory} 
                    />
                </div>
        </Authenticated>
    )
}