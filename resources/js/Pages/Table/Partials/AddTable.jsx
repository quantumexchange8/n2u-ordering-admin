import Button from "@/Components/Button";
import { PlusIcon } from "@/Components/Icon/Outline";
import React from "react";

export default function AddTable() {

    return (
        <>
            <Button
                size="lg"
                iconOnly
                className="flex gap-1 rounded-lg"
            >
                <PlusIcon />
                Add Table
            </Button>

        </>
    )
}