import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import MemberTransactionTable from "./MemberTransactionTable";
import { EditIcon, XIcon } from "@/Components/Icon/Outline";
import { useState } from "react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import { InputNumber } from "primereact/inputnumber";
import toast from "react-hot-toast";

export default function MemberDetails({ user, dineWallet, cashWallet, transaction }) {

    const [isOpen, setIsOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const changeWallet = (user) => {
        setIsOpen(true)
    }

    const closeWallet = () => {
        setIsOpen(false)
        reset()
    }

    const editProfile = (user) => {
        setEditProfileOpen(true)
    }

    const closeEditProfile = () => {
        setEditProfileOpen(false)
        reset()
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        id: user.id,
        dine_in_wallet: dineWallet.balance,
        cash_wallet: cashWallet.balance,
        point_balance: user.point,
        point: "",
        name: user.name,
        phone: user.dial_code + user.phone,
        email: user.email,
    });

    const saveWallet = (e) => {
        e.preventDefault();
        post('/member/updateMemberWallet', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeWallet();
                toast.success('Succesfully Updated.', {
                    title: 'Succesfully Updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    const saveProfile = (e) => {
        e.preventDefault();
        post('/member/updateMemberProfile', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeEditProfile();
                toast.success('Succesfully Updated.', {
                    title: 'Succesfully Updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }
    return (
        <Authenticated
            header='Member Detail'
        >

            <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl grid g gap-3">
                            <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1">
                                <div className="text-neutral-900 text-base font-bold">Personal Details</div>
                                <div className="cursor-pointer" onClick={() => editProfile(user)}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-3 gap-3 px-1">
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Name</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.name}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Phone</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.dial_code}{user.phone}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Email</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.email ? user.email : '-'}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Rank</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.rank.name}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Upline</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.upline ? user.upline.name : '-'}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Status</div>
                                    <div className="text-sm text-neutral-900 font-bold">{user.verify != null ? <div className="text-green-600">Verified</div> : <div className="text-red-600">Unverify</div>}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1">
                                <div className="text-neutral-900 text-base font-bold">Wallet</div>
                                <div className="cursor-pointer" onClick={() => changeWallet(user)}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 px-1">
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Dine In Credit Wallet</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        RM {dineWallet.balance}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Cash Wallet Credit</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        RM {cashWallet.balance}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Points Balance</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        {user.point} pts
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1">
                                <div className="text-neutral-900 text-base font-bold">Points</div>
                                <div className="cursor-pointer" onClick={() => changeWallet(user)}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 px-1">
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Points</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        {user.point} pts
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex flex-col gap-3">
                    <MemberTransactionTable 
                        user={user}
                        transaction={transaction}
                    />
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                close={closeWallet}
                title='Edit Wallets'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeWallet}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={saveWallet}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2 px-5 py-3 border-b border-neutral-100">
                        <div className="col-span-1 font-bold text-base">
                            Wallets
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            
                            <div className="font-medium text-base w-full text-neutral-500">
                                <InputLabel value='Dine In Wallet' className="text-sm"/>
                            </div>
                            <div>
                                <InputNumber 
                                    inputId="dine_in_wallet" 
                                    value={data.dine_in_wallet || ""} 
                                    onValueChange={(e) => setData('dine_in_wallet', e.value)} 
                                    mode="currency" 
                                    currency="MYR" locale="en-MY"
                                    className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <div className="font-medium text-base w-full text-neutral-500">
                                <InputLabel value='Cash Wallet' className="text-sm"/>
                            </div>
                            <div>
                                <InputNumber 
                                    inputId="cash_wallet" 
                                    value={data.cash_wallet || ''} 
                                    onValueChange={(e) => setData('cash_wallet', e.value)} 
                                    mode="currency" 
                                    currency="MYR" locale="en-MY"
                                    className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        {/* <div className="col-span-2 flex items-center gap-2">
                            <div className="font-medium text-base w-full text-neutral-500">
                                <InputLabel value='Point' className="text-sm"/>
                            </div>
                            <div>
                                <InputNumber 
                                    inputId="point" 
                                    value={data.point || ''} 
                                    onValueChange={(e) => setData('point', e.value)}
                                    min={0}
                                    useGrouping={false}
                                    className="w-full font-bold border border-neutral-100 focus:border focus:border-primary-500 rounded-md focus:outline-none focus:ring-0 caret-primary-500"
                                    pt={{
                                        input: 'focus:outline-none focus:ring-0 focus:ring-transparent'
                                    }}
                                />
                            </div>
                        </div> */}
                    </div>
                    <div className="flex flex-col px-5 py-1">
                        <div className="font-bold text-base">
                            Points
                        </div>
                        <div className="flex items-center gap-2 pb-2">
                            <div className="font-medium text-base w-full text-neutral-500">
                                <InputLabel value='Point balance' className="text-sm"/>
                            </div>
                            <div className="w-full font-bold text-sm">
                                {user.point} pts
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="font-medium text-base w-full text-neutral-500">
                                <InputLabel value='Point to add' className="text-sm"/>
                            </div>
                            <div>
                                <InputNumber 
                                    inputId="point" 
                                    value={data.point} 
                                    onValueChange={(e) => setData('point', e.value)}
                                    min={0}
                                    useGrouping={false}
                                    className="w-full font-bold border border-neutral-100 focus:border focus:border-primary-500 rounded-md focus:outline-none focus:ring-0 caret-primary-500"
                                    pt={{
                                        input: 'focus:outline-none focus:ring-0 focus:ring-transparent'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={editProfileOpen}
                close={closeEditProfile}
                title='Edit Profile'
                closeIcon={<XIcon />}
                maxWidth='lg'
                maxHeight='lg'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeEditProfile}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={saveProfile}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-2 px-5 py-3 gap-5">
                    <div className="flex flex-col space-y-1">
                        <div className="text-xs text-neutral-300">Name</div>
                        <div className="text-sm text-neutral-900">
                            <TextInput 
                                type='text'
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-xs text-neutral-300">Phone</div>
                        <div className="text-sm text-neutral-900">
                            <TextInput 
                                type='text'
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-xs text-neutral-300">Email</div>
                        <div className="text-sm text-neutral-900">
                            <TextInput 
                                type='email'
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-xs text-neutral-300">Rank</div>
                        <div className="text-sm text-neutral-900">
                            <TextInput 
                                type='text'
                                value={user.rank.name}
                                className="mt-1 block w-full"
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </Modal>

        </Authenticated>
    )
}