import Button from "@/Components/Button";
import { PlusIcon, DeleteIcon, EditIcon, XIcon } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from 'primereact/dropdown';

const settingType = [
    { value: 'amount'},
    { value: 'percentage'},
]

export default function NewConfig({ settings }) {
    
    const [newOpen, setNewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        setting_name: '',
        value: '',
        type: '',
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

    const EditModal = (setting) => {
        setEditOpen(true)
        setEditSelected(setting)
        setData({
            id: setting.id || '',     // Set the id if exists
            setting_name: setting.setting_name || '', // Set the name if exists
            value: setting.value || '', // Set the value if exists
            type: setting.type || '',
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
        <>
            <div className="flex flex-col">
                <div className="flex items-center gap-5">
                    <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-neutral-200 py-2">
                            <div className="text-base font-bold ">
                                Configuration
                            </div>
                            <div>
                            <Button
                                size="lg"
                                className="py-2 px-2 gap-1 rounded-lg text-sm"
                                onClick={() => addNew()}
                                iconOnly
                            >
                                <PlusIcon />
                                Add Configuration
                            </Button>
                            </div>
                        </div>
                        <DataTable value={settings} tableStyle={{ minWidth: '160px' }}>
                            <Column field="setting_name" header="Name" style={{ minWidth: '70px'}}></Column>
                            <Column field="type" header="Type" style={{ minWidth: '70px' }}></Column>
                            <Column field="value" header="Amount" style={{ minWidth: '70px' }}></Column>
                            <Column header="" body={ActionTemplate} style={{ minWidth: '20px' }}></Column>
                        </DataTable>
                    </div>
                </div>
                <div></div>
            </div>
            
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
                        Type
                    </div>
                    <div>
                        <Dropdown 
                            value={data.type} 
                            onChange={(e) => {
                                setData('type', e.target.value); 
                            }} 
                            options={settingType} 
                            optionLabel="value" 
                            placeholder="Type" 
                            className="w-full rounded-lg border border-neutral-100" 
                            pt={{
                                input: 'bg-transparent'
                            }}
                        />
                        <InputError message={errors.setting_type} className="mt-2" />
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
                        Type
                    </div>
                    <div>
                    <Dropdown 
                            value={data.type} 
                            onChange={(e) => {
                                setData('type', e.target.value); 
                            }} 
                            options={settingType} 
                            optionLabel="value" 
                            placeholder="Type" 
                            className="w-full rounded-lg border border-neutral-100" 
                            pt={{
                                input: 'bg-transparent'
                            }}
                        />
                        <InputError message={errors.value} className="mt-2" />
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

            
        </>
        
    )
}