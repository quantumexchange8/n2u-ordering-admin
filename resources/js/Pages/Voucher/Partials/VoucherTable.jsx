import React from "react";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import { formatDate } from "@/Composables";
import Modal from "@/Components/Modal";
import { DeleteIcon, EditIcon, XIcon } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';

const vouchers = [
    { name: 'discount' },
    // { name: 'free item' },
];

const discount = [
    { name: 'amount' },
    { name: 'percentage' },
];

const validType = [
    { name: 'period' },
    { name: 'all time' },
];

export default function VoucherTable({ rank }) {

    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedVal, setSelectedVal] = useState(null);
    const [validFrom, setValidFrom] = useState(null);
    const [validTo, setalidTo] = useState(null);
    const [validFor, setValidFor] = useState(null);
    const [selectedVoucherType, setSelectedVoucherType] = useState(null);
    const [selectedDiscType, setSelectedDiscType] = useState(null);
    const [selectedValidType, setSelectedValidType] = useState(null);
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    const [value, setValue] = useState('');
    // const [voucherId, setVoucherId] = useState(null);
    
    const fetchData = async () => {
        try {

            const response = await axios.get('/voucher/getAllVoucher');
            
            setDatas(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        name: '',
        point: '',
        type: '',
        amount: '',
        percent: '',
        rank: '',
        discount: '',
        valid_type: '',
        valid_from: '',
        valid_to: '',
    });



    const voucherClick = (voucher) => {
        setSelectedVal(voucher);
        setIsOpen(true)
        
        const selectedRank = rank.find(r => r.id === voucher.rank_id);
        const selectedVoucherType = vouchers.find(r => r.name === voucher.type);
        const selectedDiscType = discount.find(r => r.name === voucher.discount_type);
        const selectedValidType = validType.find(r => r.name === voucher.valid_type);
        const startDate = new Date(voucher.valid_from);
        const endDate = new Date(voucher.valid_to);
        const voucherId = voucher.id;

        setValidFor(selectedRank);
        setSelectedVoucherType(selectedVoucherType)
        setSelectedDiscType(selectedDiscType)
        setSelectedValidType(selectedValidType)
        setValidFrom([startDate, endDate]);
        setData('valid_from', startDate);
        setData('valid_to', endDate);
        setData('id', voucherId);
    }
    
    const closeVoucher = () => {
        setIsOpen(false);
        reset();
    }

    const deleteVoucher = (voucher) => {
        setSelectedId(voucher);
    
        confirmDialog({
            group: 'delete',
            message: 'Are you sure you want to Delete this voucher?',
            header: 'Delete Voucher',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: confirmDeleteVoucher,
            reject: cancelDelete,
            
        });
    }

    const confirmDeleteVoucher = async () => {
        try {
            await axios.post('/voucher/deleteVoucher', {
                id: selectedId,
            });

            toast.success('Rejected.', {
                title: 'Rejected.',
                duration: 3000,
                variant: 'variant3',
            });

            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    useEffect(() => {

        if (selectedVal) {
            
            setName(selectedVal.name);
            setPoint(selectedVal.point)

            setData('name', selectedVal.name);
            setData('point', selectedVal.point);
            setData('type', selectedVal.type);
            setData('amount', selectedVal.amount);
            setData('percent', selectedVal.percent);
            setData('rank', selectedVal.rank_id);
            setData('discount', selectedVal.discount_type);
            setData('valid_type', selectedVal.valid_type);
            if (validFrom) {
                setData('valid_from', validFrom)
            }
        }
    }, [selectedVal, validFrom]);

    const cancelDelete = () => {
        
    }

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const submit = (e) => {
        e.preventDefault();
        post('/voucher/updateVoucher', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeVoucher();
                toast.success('Succesfully Updated.', {
                    title: 'Succesfully Updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        })
    }

    return (

        <>
            <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                {
                    datas.length > 0 ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {
                                datas.map((voucher, index) => (
                                    <div key={index} className="flex flex-col w-full border border-neutral-100 rounded-lg">
                                        <div>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png" alt="" className="" />
                                        </div>
                                        <div className="p-3 flex flex-col items-center gap-3">
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-neutral-500 text-xs">Voucher Name</div>
                                                <div className="text-neutral-900 text-xs font-bold">
                                                    {
                                                        voucher.name
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-1 w-full">
                                                <div className="text-neutral-500 text-xs">Status</div>
                                                <div className="text-neutral-900 text-sm font-bold">{voucher.status}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center border-t border-neutral-100">
                                            <div className="w-full flex justify-center p-1 hover:bg-neutral-100 cursor-pointer" onClick={() => voucherClick(voucher)}>
                                                <EditIcon />
                                            </div>
                                            <div className="w-[1px] h-full bg-neutral-100"></div>
                                            <div className="w-full flex justify-center p-1 hover:bg-neutral-100 cursor-pointer" onClick={() => deleteVoucher(voucher.id)}>
                                                <DeleteIcon />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-[70vh]">
                            {
                                isLoading ? (
                                    <l-zoomies
                                    size="150"
                                    stroke="5"
                                    bg-opacity="0.1"
                                    speed="1.0" 
                                    color="#F26522" 
                                    ></l-zoomies>
                                ) : (
                                    <div>
                                        No voucher created yet
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>

            <Modal
                isOpen={isOpen}
                close={closeVoucher}
                title='View Voucher'
                closeIcon={<XIcon />}
                maxWidth='lg'
                maxHeight='lg'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeVoucher}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={submit}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                {
                    selectedVal && (
                        <div className="flex flex-col gap-3 max-h-[550px] overflow-auto p-5">
                            <div className="w-full flex justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png" alt="" className=" h-56" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-full flex flex-col space-y-1">
                                        <InputLabel value='Voucher Name' />  
                                        <TextInput 
                                            type='text'
                                            value={name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setData('name', e.target.value);
                                            }}
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="w-full flex flex-col space-y-1">
                                        <InputLabel value='Point to Redeem' />
                                        <TextInput 
                                            type='number'
                                            value={point}
                                            min='1'
                                            className="mt-1 block w-full"
                                            onChange={(e) => {
                                                setData('point', e.target.value);
                                                setPoint(e.target.value);
                                            }}
                                        />
                                        <InputError message={errors.point} className="mt-2" />
                                    </div>
                                    <div className="w-full flex flex-col space-y-1">
                                        <InputLabel value='Voucher Valid' />
                                        <Dropdown 
                                            value={validFor} 
                                            onChange={(e) => {
                                                setValidFor(e.value); 
                                                setData('rank', e.value.name); 
                                            }}  
                                            options={rank} 
                                            optionLabel="name" 
                                            placeholder="Valid for user" 
                                            className="w-full rounded-lg border border-neutral-100" 
                                            pt={{
                                                input: 'bg-transparent'
                                            }}
                                        />
                                        <InputError message={errors.rank} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-full flex flex-col space-y-1">
                                        <InputLabel value='Voucher Type' />
                                        <Dropdown 
                                            value={selectedVoucherType} 
                                            onChange={(e) => {
                                                setSelectedVoucherType(e.value);
                                                setData('type', e.value.name); 
                                            }} 
                                            options={vouchers} 
                                            optionLabel="name" 
                                            placeholder="Voucher Type" 
                                            className="w-full rounded-lg border border-neutral-100" 
                                            pt={{
                                                input: 'bg-transparent'
                                            }}
                                        />
                                        <InputError message={errors.type} className="mt-2" />
                                    </div>
                                    {
                                        selectedVoucherType != null && selectedVoucherType.name === 'discount' ? (
                                            <div className="w-full flex items-center gap-3">
                                                <div className="flex flex-col space-y-1 w-full">
                                                    <InputLabel value='Discount Type' />
                                                    <Dropdown 
                                                        value={selectedDiscType} 
                                                        onChange={(e) => {
                                                            setSelectedDiscType(e.value);
                                                            setData('discount', e.value.name); 
                                                        }} 
                                                        options={discount} 
                                                        optionLabel="name" 
                                                        placeholder="Discount Type" 
                                                        className="w-full rounded-lg border border-neutral-100" 
                                                        pt={{
                                                            input: 'bg-transparent'
                                                        }}
                                                    />
                                                    <InputError message={errors.discount} className="mt-2" />
                                                </div>
                                                {
                                                    selectedDiscType != null && selectedDiscType.name === 'amount' ? (
                                                        <div className="flex flex-col space-y-1 w-full">
                                                            <InputLabel value='Amount' />
                                                            <InputNumber 
                                                                inputId="amount" 
                                                                value={selectedVal.value} 
                                                                onValueChange={(e) => setData('amount', e.value)} 
                                                                mode="currency" 
                                                                currency="MYR" locale="en-MY"
                                                                className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                                            />
                                                            <InputError message={errors.amount} className="mt-2" />
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col space-y-1 w-full">
                                                            <InputLabel value='Percentage' />
                                                            <TextInput 
                                                                type='text'
                                                                value={value}
                                                                min='1'
                                                                className="mt-1 block w-full"
                                                                onChange={(e) => {
                                                                    setData('percent', e.target.value);
                                                                    setValue(e.target.value);
                                                                }}
                                                            />
                                                            <InputError message={errors.percent} className="mt-2" />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                        
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col space-y-1 w-full">
                                        <InputLabel value='Period Type' />
                                        <Dropdown 
                                            value={selectedValidType} 
                                            onChange={(e) => {
                                                setSelectedValidType(e.value);
                                                setData('valid_type', e.value.name); 
                                            }} 
                                            options={validType} 
                                            optionLabel="name" 
                                            placeholder="Period Type" 
                                            className="w-full rounded-lg border border-neutral-100" 
                                            pt={{
                                                input: 'bg-transparent'
                                            }}
                                        />
                                        <InputError message={errors.valid_type} className="mt-2" />
                                    </div>
                                    {
                                        selectedValidType !== null && selectedValidType.name === 'period' ? (
                                            <>
                                                <div className="flex flex-col space-y-1 w-full">
                                                    <InputLabel value='Valid From - Valid To' />
                                                    <Calendar 
                                                        value={validFrom} 
                                                        onChange={(e) => {
                                                            setValidFrom(e.value);
                                                            setData('valid_from', e.value[0]);
                                                            setData('valid_to', e.value[1]);
                                                        }}  
                                                        selectionMode="range" 
                                                        readOnlyInput 
                                                        hideOnRangeSelection
                                                        className="border border-neutral-100 rounded-lg hover:border-primary-500 focus:border-primary-500 focus:shadow-none focus:outline-none focus:ring-0"
                                                    />
                                                    <InputError message={errors.valid_from} className="mt-2" />
                                                </div>
                                                
                                            </>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>

            <ConfirmDialog 
                group="delete"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
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
                                    cancelDelete();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    confirmDeleteVoucher();
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