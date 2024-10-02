import Button from "@/Components/Button";
import { PlusIcon, DeleteIcon, EditIcon, XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function NewTax({ taxes}) {
    const [newOpen, setNewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        name: '',
        amount: '',
        tax_after: '',
        tax_type: '',
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

    const submitNewTax = (e) => {
        e.preventDefault();
        post('/newTax', {
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

    const EditModal = (tax) => {
        setEditOpen(true)
        setEditSelected(tax)
        setData({
            id: tax.id || '',     // Set the id if exists
            name: tax.name || '', // Set the name if exists
            amount: tax.amount || '', // Set the value if exists
            tax_after: tax.tax_after || '',
            tax_type: tax.tax_type || '',
        });
    }

    const closeEditModal = () => {
        setEditOpen(false)
    }

    const DeleteModal = (tax) => {
        setSelectedId(tax.id)

        confirmDialog({
            group: 'delete',
            message: 'Are you sure you want to Delete this tax?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: confirmDelete,
            reject: rejectDelete,
            
        });
    }

    const confirmDelete = async () => {
        
        try {
            await axios.post('/deleteTax', {
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

    const saveTax = (e) => {
        e.preventDefault();
        post('/updateTax', {
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

    const ActionTemplate = (tax) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => EditModal(tax)}>
                    <EditIcon /> 
                </div>
                <div className="hover:rounded-full hover:bg-neutral-100 p-1 cursor-pointer" onClick={() => DeleteModal(tax)}>
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
                            Tax
                        </div>
                        <div>
                        <Button
                            size="lg"
                            className="py-2 px-2 gap-1 rounded-lg text-sm"
                            onClick={() => addNew()}
                            iconOnly
                            >
                                <PlusIcon />
                                Add Tax
                            </Button>
                        </div>
                    </div>
                    <DataTable value={taxes} tableStyle={{ minWidth: '160px' }}>
                        <Column field="name" header="Name" style={{ minWidth: '40px'}}></Column>
                        <Column field="amount" header="Amount" style={{ minWidth: '30px' }}></Column>
                        <Column field="tax_after" header="Tax After" style={{ minWidth: '30px' }}></Column>
                        <Column field="tax_type" header="Tax Type" style={{ minWidth: '30px' }}></Column>
                        <Column header="" body={ActionTemplate} style={{ minWidth: '30px' }}></Column>
                    </DataTable>
                </div>
            </div>
            <div></div>
        </div>
            
            <Modal
                isOpen={newOpen}
                close={closeNew}
                title='New Tax'
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
                            onClick={submitNewTax}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <div className="p-5 grid grid-cols-2 gap-3">
                    <div className="text-sm">
                        Name
                    </div>
                    <div>
                        <TextInput 
                            type='text'
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.tax_name} className="mt-2" />
                    </div>
                    <div className="text-sm">
                        Amount
                    </div>
                    <div>
                        <TextInput 
                            type='number'
                            value={data.amount}
                            min='1'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />
                    </div>
                    <div className="text-sm">
                        Tax After
                    </div>
                    <div>
                        <TextInput 
                            type='number'
                            value={data.tax_after}
                            min='1'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tax_after', e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />
                    </div>
                    <div className="text-sm">
                        Tax Type
                    </div>
                    <div>
                        <TextInput 
                            type='text'
                            value={data.tax_type}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tax_type', e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={editOpen}
                close={closeEditModal}
                title='Edit Tax'
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
                            onClick={saveTax}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <div className="p-5 grid grid-cols-2 items-center gap-3">
                    <div className="text-sm " >
                        Name
                    </div>
                    <div>
                        <TextInput 
                            type='text'
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="text-sm " >
                        Amount
                    </div>
                    <div>
                        <TextInput 
                            type='number'
                            value={data.amount}
                            min='1'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        <InputError message={errors.amount} className="mt-2" />
                    </div>
                    <div className="text-sm " >
                        Tax After
                    </div>
                    <div>
                        <TextInput 
                            type='number'
                            value={data.tax_after}
                            min='1'
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tax_after', e.target.value)}
                        />
                        <InputError message={errors.tax_after} className="mt-2" />
                    </div>
                    <div className="text-sm " >
                        Tax Type
                    </div>
                    <div>
                        <TextInput 
                            type='text'
                            value={data.tax_type}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tax_type', e.target.value)}
                        />
                        <InputError message={errors.tax_type} className="mt-2" />
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
