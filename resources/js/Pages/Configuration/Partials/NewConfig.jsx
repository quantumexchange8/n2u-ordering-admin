import Button from "@/Components/Button";
import { PlusIcon, XIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewConfig() {

    const [newOpen, setNewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        setting_name: '',
        value: '',
    });

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const addNew = () => {
        setNewOpen(true)
    }

    const closeNew = () => {
        setNewOpen(false)
        reset();
    }

    const submitNewConfig = (e) => {
        e.preventDefault();
        post('/newConfiguration', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeNew();
                toast.success('Succesfully Added.', {
                    title: 'Succesfully Added.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    return (

        <>
            <Button
                size="lg"
                className="py-2 px-2 gap-1 rounded-lg text-sm"
                onClick={() => addNew()}
                iconOnly
            >
                <PlusIcon />
                Add Configuration
            </Button>


            <Modal
                isOpen={newOpen}
                close={closeNew}
                title='New Configuration'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeNew}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={submitNewConfig}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <div className="p-5 grid grid-cols-2 items-center gap-3">
                    <div className="text-sm " >
                        Configuration Name
                    </div>
                    <div>
                        <TextInput 
                            type='text'
                            value={data.setting_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('setting_name', e.target.value)}
                        />
                        <InputError message={errors.setting_name} className="mt-2" />
                    </div>
                    <div className="text-sm " >
                        Value
                    </div>
                    <div>
                        <TextInput 
                            type='number'
                            value={data.value}
                            min='1'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('value', e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />
                    </div>
                </div>
            </Modal>
        </>
        
    )
}