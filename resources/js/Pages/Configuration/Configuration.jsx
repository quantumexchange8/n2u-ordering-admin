import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { DeleteIcon, EditIcon, XIcon } from "@/Components/Icon/Outline";
import NewConfig from "./Partials/NewConfig";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import NewTax from "./Partials/NewTax";

export default function Configuration({ auth, settings, taxes }) {
    
    const [editOpen, setEditOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        settings: [
            {
                id: '',
                setting_name: '',
                value: '',
            }
        ],
        taxes: [
            {
                id: '',
                name: '',
                amount: '',
                tax_after: '',
                tax_type: '',
            }
        ]

    });
    
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
                <TabGroup className="flex flex-col gap-5">
                    <TabList className="flex">
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Member
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Tax
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <NewConfig settings={settings} />
                        </TabPanel>
                        <TabPanel>
                            <NewTax taxes={taxes} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>

            {/* <ConfirmDialog 
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
            /> */}

        </Authenticated>
    )
}