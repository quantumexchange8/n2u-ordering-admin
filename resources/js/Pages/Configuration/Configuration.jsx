import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from "@/Components/Button";
import { DeleteIcon, EditIcon, XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import NewConfig from "./Partials/NewConfig";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function Configuration({ auth, settings }) {
    
    const [editOpen, setEditOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        setting_name: '',
        value: '',
    });

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const EditModal = (setting) => {
        setEditOpen(true)
        setEditSelected(setting)
        setData({
            id: setting.id || '',     // Set the id if exists
            setting_name: setting.setting_name || '', // Set the name if exists
            value: setting.value || '', // Set the value if exists
        });
    }

    const closeEditModal = () => {
        setEditOpen(false)
    }

    const DeleteModal = (setting) => {
        setSelectedId(setting.id)

        confirmDialog({
            group: 'delete',
            message: 'Are you sure you want to Delete this setting?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: confirmDelete,
            reject: rejectDelete,
            
        });
    }

    const confirmDelete = async () => {
        
        try {
            await axios.post('/deleteSetting', {
                id: selectedId,
            });

            handleItemAdded();

            toast.success('Approved.', {
                title: 'Approved.',
                duration: 3000,
                variant: 'variant3',
            });

            
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const rejectDelete = () => {
        
    }

    const saveConfig = (e) => {
        e.preventDefault();
        post('/updateConfiguration', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeEditModal();
                toast.success('Succesfully Updated.', {
                    title: 'Succesfully Updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    const ActionTemplate = (setting) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => EditModal(setting)}>
                    <EditIcon /> 
                </div>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => DeleteModal(setting)}>
                    <DeleteIcon />
                </div>
            </div>
        );
    };

    return (
        <Authenticated
            user={auth.user}
            header="Configuration"
        >

            <Head title="Configuration" />

            <div className="flex flex-col">
                <div className="flex items-center gap-5">
                    <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-neutral-200 py-2">
                            <div className="text-base font-bold ">
                                Configuration
                            </div>
                            <div>
                                <NewConfig />
                            </div>
                        </div>
                        <DataTable value={settings} tableStyle={{ minWidth: '160px' }}>
                            <Column field="setting_name" header="Name" style={{ minWidth: '70px'}}></Column>
                            <Column field="value" header="Amount" style={{ minWidth: '70px' }}></Column>
                            <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                        </DataTable>
                    </div>
                </div>
                <div></div>
            </div>

            <Modal
                isOpen={editOpen}
                close={closeEditModal}
                title='Edit Configuration'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeEditModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={saveConfig}
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

            <ConfirmDialog 
                group="delete"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg max-w-[300px] bg-white">
                        <div></div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro select-none" ref={headerRef}>
                                {message.header}
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center select-none' ref={contentRef}>
                                {message.message}
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    rejectDelete();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    confirmDelete();
                                }}
                                variant="red"
                                size='sm'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Delete</Button>
                            
                        </div>
                    </div>
                )}
            />

        </Authenticated>
    )
}