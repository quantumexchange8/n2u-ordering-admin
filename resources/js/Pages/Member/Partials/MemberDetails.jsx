import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import MemberTransactionTable from "./MemberTransactionTable";
import { EditIcon, KeyIcon, SyncIcon, XIcon } from "@/Components/Icon/Outline";
import { useState } from "react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import { InputNumber } from "primereact/inputnumber";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Skeleton } from 'primereact/skeleton';
import CountUp from 'react-countup';
import { Calendar } from 'primereact/calendar';
import InputError from "@/Components/InputError";
import { Dropdown } from 'primereact/dropdown';

export default function MemberDetails({ user, cashWallet, dineWallet }) {

    const walletType = [
        { name: 'Dine In Wallet' },
        { name: 'Credit Wallet' },
        { name: 'Point' },
    ];

    const balanceType = [
        { name: 'Deposit' },
        { name: 'Withdrawal' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [editPasswordOpen, setEditPasswordOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTable, setRefreshTable] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userWallet, setUserWallet] = useState([]);
    // const [dineWallet, setDineWallet] = useState(null);
    // const [cashWallet, setCashWallet] = useState(null);
    const [selectedWalletType, setSelectedWalletType] = useState(null);
    const [selectedBalType, setSelectedBalType] = useState(null);
    
    const fetchData = async () => {
        try {

            const response = await axios.get('/member/getUserDetails', {
                params: {
                    user_id: user.id,
                },
            });
            
            setUserData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const fetchWalletData = async () => {
    //     try {

    //         const response = await axios.get('/member/getUserWallet', {
    //             params: {
    //                 user_id: user.id,
    //             },
    //         });
            
    //         setUserWallet(response.data);
            
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, []);

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const changeWallet = (user) => {
        setIsOpen(true)
    }

    const closeWallet = () => {
        setIsOpen(false)
        setSelectedWalletType(null)
        setSelectedBalType(null)
        reset()
    }

    const editProfile = (user) => {
        setEditProfileOpen(true)
    }

    const closeEditProfile = () => {
        setEditProfileOpen(false)
        reset()
    }

    const editPassword = (user) => {
        setEditPasswordOpen(true)
    }

    const closeEditPassword = () => {
        setEditPasswordOpen(false)
        reset()
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        id: user.id,
        dine_in_wallet: '',
        cash_wallet: '',
        point_balance: user.point,
        point: "",
        name: user.name,
        phone: user.dial_code + user.phone,
        email: user.email,
        dob: user.dob ? new Date(user.dob) : null,
        gender: user.gender,
        member_id: user.member_id,
        role_id: user.role_id,
        address1: user.address1,
        address2: user.address2,
        address3: user.address3,
        city: user.city,
        state: user.state,
        zip: user.zip,
        password: '',
        password_confirmation: '',
        wallet_type: '',
        bal_type: '',
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

    const updateNewPassword = (e) => {
        e.preventDefault();
        post('/member/updateMemberPassword', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                handleItemAdded();
                closeEditPassword();
                toast.success('Succesfully Updated.', {
                    title: 'Succesfully Updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    const SyncCustomer = async () => {

        setSyncing(true);

        try {

            await axios.post('/syncUserDetails', {
                params: {
                    idCustomer: user.customer_id,
                    id: user.customer_id,
                },
            });

            toast.success('Sync successfully.', {
                title: 'Sync successfully.',
                duration: 3000,
                variant: 'variant3',
            });

        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setSyncing(false); // Reset processing state after request completes
        }
    }

    return (
        <Authenticated
            header='Member Detail'
        >

            <Head  title="Member Details" />
            <div className="flex flex-col gap-5">
                {
                    user.customer_id !== null && (
                        <div className="flex justify-end">
                            <Button 
                                size="sm" 
                                iconOnly 
                                className="flex items-center gap-2 py-2.5 px-4"
                                onClick={SyncCustomer}
                                disabled={syncing}
                            >
                                <SyncIcon className={`${syncing ? 'animate-spin' : ''}`}/>
                                <span>Sync</span>
                            </Button>
                        </div>
                    )
                }
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full flex flex-col gap-5">
                        {
                            userData.id != null ? (
                                <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl grid g gap-3">
                                    <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <img className='object-cover w-8 h-8 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-neutral-900 text-sm font-bold leading-none">{userData.name}</div>
                                                <div className="text-neutral-900 text-xs font-bold leading-none">{userData.role_id ? userData.role_id : userData.member_id}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="cursor-pointer" onClick={() => editProfile(user)}>
                                                <EditIcon />
                                            </div>
                                            <div className="cursor-pointer" onClick={() => editPassword(user)}>
                                                <KeyIcon />
                                            </div>
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
                            ) : (
                                <>
                                    {
                                        isLoading ? (
                                            <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl grid g gap-3">
                                                <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1">
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-neutral-900 text-sm font-bold leading-none"><Skeleton width="8rem" className="mb-1"></Skeleton></div>
                                                            <div className="text-neutral-900 text-xs font-bold leading-none"><Skeleton width="8rem" className="mb-1"></Skeleton></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div >
                                                            <EditIcon />
                                                        </div>
                                                        <div >
                                                            <KeyIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 grid-rows-3 gap-3 px-1">
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Name</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem" ></Skeleton></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Phone</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem" ></Skeleton></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Email</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem"></Skeleton></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Rank</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem" ></Skeleton></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Upline</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem" ></Skeleton></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xs text-neutral-300">Status</div>
                                                        <div className="text-sm text-neutral-900 font-bold"><Skeleton width="10rem" ></Skeleton></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex justify-center items-center gap-3">
                                                Failed to load data
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-neutral-200 py-2 px-1 h-[49px]">
                                <div className="text-neutral-900 text-base font-bold">Wallet</div>
                                <div className="cursor-pointer" onClick={() => changeWallet(user)}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 px-1">
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Dine In Credit Wallet</div>
                                    <div className="text-sm text-neutral-900 font-bold flex items-center gap-1">
                                        <span>RM </span> <CountUp end={dineWallet.balance} duration={2} decimals={2}/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Cash Wallet Credit</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        <span>RM </span>  <CountUp end={cashWallet.balance} duration={2} decimals={2}/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-neutral-300">Points Balance</div>
                                    <div className="text-sm text-neutral-900 font-bold">
                                        <CountUp end={user.point} duration={2} decimals={2}/> pts
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full p-4 shadow-container bg-white md:shadow-container rounded-xl flex flex-col gap-3">
                    <MemberTransactionTable 
                        user={user}
                    />
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                close={closeWallet}
                title='Wallet & Point Adjustment'
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
                <div className="flex flex-col gap-2 px-5 py-3">
                    {
                        selectedWalletType && (
                            <>
                                {
                                    selectedWalletType.name === 'Dine In Wallet' && (
                                        <div className="py-3 flex flex-col items-center justify-center">
                                            <div className="text-sm">Balance:</div>
                                            <div className="font-bold text-lg leading-none">
                                                RM <CountUp end={dineWallet.balance} duration={2} decimals={2}/>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    selectedWalletType.name === 'Credit Wallet' && (
                                        <div className="py-3 flex flex-col items-center justify-center">
                                            <div className="text-sm">Balance:</div>
                                            <div className="font-bold text-lg leading-none">
                                                RM <CountUp end={cashWallet.balance} duration={2} decimals={2}/>
                                            </div>
                                        </div>
                                    )
                                }

{
                                    selectedWalletType.name === 'Point' && (
                                        <div className="py-3 flex flex-col items-center justify-center">
                                            <div className="text-sm">Balance:</div>
                                            <div className="font-bold text-lg leading-none">
                                                <CountUp end={user.point} duration={2} decimals={2}/> pts
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1 w-full">
                            <InputLabel value='Wallet' />
                            <Dropdown 
                                value={selectedWalletType}
                                onChange={(e) => {
                                    setSelectedWalletType(e.value);
                                    setData('wallet_type', e.value.name); 
                                }} 
                                options={walletType}
                                optionLabel="name" 
                                placeholder="Select Wallet" 
                                className="w-full rounded-lg border border-neutral-100" 
                                pt={{
                                    input: 'bg-transparent'
                                }}
                            />
                            <InputError message={errors.wallet_type} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <InputLabel value='Action' />
                            <Dropdown 
                                value={selectedBalType}
                                onChange={(e) => {
                                    setSelectedBalType(e.value);
                                    setData('bal_type', e.value.name); 
                                }} 
                                options={balanceType}
                                optionLabel="name" 
                                placeholder="Action" 
                                className="w-full rounded-lg border border-neutral-100" 
                                pt={{
                                    input: 'bg-transparent'
                                }}
                            />
                            <InputError message={errors.bal_type} className="mt-2" />
                        </div>
                    </div>
                    {
                        selectedWalletType ? (
                            <>
                                {
                                    selectedWalletType.name === 'Dine In Wallet' && (
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
                                    )
                                }

                                {
                                    selectedWalletType.name === 'Credit Wallet' && (
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
                                    )
                                }

{
                                    selectedWalletType.name === 'Point' && (
                                        <div className="flex flex-col space-y-1 w-full">
                                            <InputLabel value='Point' />
                                            <InputNumber 
                                                inputId="point" 
                                                value={data.point || ''} 
                                                onValueChange={(e) => setData('point', e.value)} 
                                                suffix=" PTS"
                                                className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                            />
                                            <InputError message={errors.amount} className="mt-2" />
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            ''
                        )
                    }
                    
                </div>
                {/* <div className="flex flex-col gap-2">
                    
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
                                    value={dineWallet ? dineWallet.balance : ''}
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
                                    value={cashWallet ? cashWallet.balance : ''} 
                                    onValueChange={(e) => setData('cash_wallet', e.value)} 
                                    mode="currency" 
                                    currency="MYR" locale="en-MY"
                                    className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        
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
                </div> */}
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
                <div className="px-5 py-3 flex flex-col gap-5">
                    {/* <div className="w-full flex justify-center items-center">
                        <div>
                            <img className='object-cover md:w-14 ld:w-20 md:h-14 ld:h-20 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                        </div>
                    </div> */}
                    <div className="grid grid-cols-6 md:gap-3 lg:gap-5">
                        <div className="flex flex-col space-y-1 col-span-3">
                            <div className="text-xs text-neutral-300">Name</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.name || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-3">
                            <div className="text-xs text-neutral-300">Email</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='email'
                                    value={data.email || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={false}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300 col-span-3">Phone</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.phone || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">N2U Role ID</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.role_id || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('role_id', e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Existing Card ID</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.member_id || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('member_id', e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Rank</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={user.rank.name || ""}
                                    className="mt-1 block w-full"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Date of Birth</div>
                            <div className="text-sm text-neutral-900">
                                {/* <TextInput 
                                    type='date'
                                    value={data.dob || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('dob', e.target.value)}
                                    disabled={false}
                                /> */}
                                <Calendar 
                                    value={data.dob} 
                                    onChange={(e) => {
                                        setData('dob', e.value);
                                    }}
                                    className="border border-neutral-100 rounded-lg hover:border-primary-500 focus:border-primary-500 focus:shadow-none focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Gender</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput
                                    type="text"
                                    value={data.gender === '0' ? 'Male' : data.gender === '1' ? 'Female' : ''}
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === 'Male') {
                                        setData('gender', 0);
                                        } else if (value === 'Female') {
                                        setData('gender', 1);
                                        } else {
                                        setData('gender', '');
                                        }
                                    }}
                                />

                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Address</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.address1 || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('address1', e.target.value)}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Address 2</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.address2 || ""}
                                    onChange={(e) => setData('address2', e.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Address 3</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.address3 || ""}
                                    onChange={(e) => setData('address3', e.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">City</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.city || ""}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('city', e.target.value)}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">State</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    type='text'
                                    value={data.state || ""}
                                    onChange={(e) => setData('state', e.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-2">
                            <div className="text-xs text-neutral-300">Zip</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                type='text'
                                value={data.zip || ""}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('zip', e.target.value)}
                                disabled={false} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={editPasswordOpen}
                close={closeEditPassword}
                title='Edit Password'
                closeIcon={<XIcon />}
                maxWidth='md'
                maxHeight='md'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="flex justify-center"
                            onClick={closeEditPassword}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex justify-center"
                            type="submit"
                            onClick={updateNewPassword}
                            disabled={processing}
                        >
                            <span className="px-2">Save</span>
                        </Button>
                    </div>
                }
            >
                <form>
                    <div className="px-5 py-3 flex flex-col gap-5">
                        <div className="flex flex-col space-y-1 col-span-3">
                            <div className="text-xs text-neutral-300">New Password</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={data.password}
                                    autoComplete="new-password"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 col-span-3">
                            <div className="text-xs text-neutral-300">Confirm New Password</div>
                            <div className="text-sm text-neutral-900">
                                <TextInput 
                                    id="confirm_password"
                                    name="confirm_password"
                                    type='password'
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>

        </Authenticated>
    )
}