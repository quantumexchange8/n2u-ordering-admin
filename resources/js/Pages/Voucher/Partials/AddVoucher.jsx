import Button from "@/Components/Button";
import { PlusIcon, XIcon } from "@/Components/Icon/Outline";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import InputIconWrapper from "@/Components/InputIconWrapper";
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import toast from "react-hot-toast";
import InputError from "@/Components/InputError";

export default function AddVoucher({  }) {

    const [isOpen, setIsOepn] = useState(false);
    const [selectedVoucherType, setSelectedVoucherType] = useState(null);
    const [selectedDiscType, setSelectedDiscType] = useState(null);
    const [selectedValidType, setSelectedValidType] = useState(null);
    const [validFrom, setalidFrom] = useState(null);
    const [validTo, setalidTo] = useState(null);
    const [validFor, setValidFor] = useState(null);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);

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

    const rank = [
        { name: 'All User' },
        { name: 'VIP' },
    ];

    const AddVoucher = () => {
        setIsOepn(true)
    }

    const closeVoucher = () => {
        setIsOepn(false)
        reset()
    }

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        point: '',
        type: '',
        amount: '',
        percent: '',
        rank: '',
        discount: '',
        valid_type: '',
        valid_from: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/voucher/addVoucher', {
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
            <Button
                size="lg"
                iconOnly
                className="flex gap-1 rounded-lg"
                onClick={() => AddVoucher()}
            >
                <PlusIcon />
                Add Voucher
            </Button>

            <Modal
                isOpen={isOpen}
                close={closeVoucher}
                title='Add Voucher'
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
                                    value={data.name}
                                    min='1'
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                  />
                                  <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="w-full flex flex-col space-y-1">
                                <InputLabel value='Point to Redeem' />
                                <TextInput 
                                    type='number'
                                    value={data.point}
                                    min='1'
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('point', e.target.value)}
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
                                                        value={data.amount || ''} 
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
                                                        value={data.percent}
                                                        min='1'
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('percent', e.target.value)}
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
                                                    setalidFrom(e.value);
                                                    setData('valid_from', e.value); 
                                                }} 
                                                selectionMode="range" 
                                                showTime hourFormat="24"
                                                readOnlyInput 
                                                hideOnRangeSelection
                                                dateFormat="dd/mm/yy"
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

                        <div className="flex flex-col gap-3">
                            <Editor 
                                value={text} 
                                onTextChange={(e) => {
                                    const editorText = e.htmlValue;
                                    setText(editorText); // Update local state
                                    setData('description', editorText); // Update form data
                                }} 
                                style={{ height: '240px' }} 
                                className="w-full"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}