import React from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { EinbillLogo } from "@/Components/Icon/logo";
import { ChevronDown, ChevronUp, ConfigurationIcon, CornerDownRight, DashboardIcon, HistoryIcon, LogoutIcon, MemberIcon, TableIcon, VoucherIcon, WalletIcon, XIcon } from "./Icon/Outline";
import { useState } from "react";
import { useEffect } from "react";

export default function SideBar({ user, showingNavigationDropdown, expanded, toggleSidebar }) {

    const { url } = usePage();
    const [walletExpand, setWalletExpand] = useState(false);

    const { datas, setData, post, processing, reset } = useForm({});

    const logout = () => {
        post(route('logout'));
    }

    const walletDropDown = () => {
        setWalletExpand(!walletExpand)
    }

    useEffect(() => {
        if (url === '/transaction/pending' || url === '/transaction/history') {
          setWalletExpand(true);
        }
      }, [url]);

    return (
        <>
            <div className={`${expanded ? 'fixed inset-0 z-20 bg-black/50 md:hidden' : ''} `} onClick={toggleSidebar}></div>
            <aside className={`fixed inset-y-0 z-20 overflow-auto p-4 max-w-60 bg-gray-25
                scrollbar-thin scrollbar-webkit ease-in-out duration-300
                ${!expanded ? 'translate-x-[-100%] md:translate-x-0 md:w-[75px]' : 'translate-x-0 w-60'}
                ease-in-out duration-300`}
            >
                <nav className="flex flex-col gap-5 rounded-xl shadow-container min-h-[80vh] md:min-h-0 bg-white">
                    {!expanded ? (
                        <div className="px-1 py-4">
                            <img src="/assets/logo_2.png" alt="" className="w-8"/>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center p-4">
                            <img src="/assets/logo.png" alt="" className="w-12 h-12" />
                            <div className="block cursor-pointer md:hidden" onClick={toggleSidebar}>
                                <XIcon />
                            </div>
                        </div>
                    )}
                    <div className={`flex flex-col gap-3 px-2 ${!expanded ? 'items-center': ''}`}>
                        <div>
                            {
                                !expanded ? (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <DashboardIcon color='currentColor' className={`${url === '/dashboard' ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'bg-primary-500 font-bold text-white rounded-lg p-3 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'p-3 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md'} `}>
                                            <DashboardIcon color='currentColor' />
                                            <div className="text-sm">
                                                Dashboard
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }  
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('member.member-listing')} className={`${
                                        url === '/member/member-listing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/member/member-listing' ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <MemberIcon color='currentColor' className={`${url === '/member/member-listing' ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('member.member-listing')} className={`${
                                        url === '/member/member-listing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/member/member-listing' ? 'bg-primary-500 font-bold text-white rounded-lg p-3 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'p-3 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md'} `}>
                                            <MemberIcon color='currentColor' />
                                            <div className="text-sm">
                                                Member Listing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('transaction.pending')} className={`${
                                        url === '/transaction/pending' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === "/transaction/pending" || url === "/transaction/history" ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <WalletIcon color='currentColor' className={`${url === "/transaction/pending" || url === "/transaction/history" ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col">
                                        <div className="p-3 flex items-center justify-between gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md cursor-pointer" onClick={walletDropDown} href="#">
                                            <div className="flex items-center gap-3">
                                                <WalletIcon color='currentColor'/>
                                                <div className="text-sm">
                                                    Wallet
                                                </div> 
                                            </div>
                                            <div>
                                                {
                                                    walletExpand ? <ChevronUp /> : <ChevronDown />
                                                }
                                            </div>
                                        </div>
                                        <div 
                                            className={`overflow-hidden transition-all duration-400 ease-in-out ${
                                                walletExpand ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="flex gap-1 items-center pl-4">
                                                <div>
                                                    <CornerDownRight />
                                                </div>
                                                <Link href={route('transaction.pending')} className={`${
                                                    url === '/transaction/pending' ? 'text-primary-700 font-bold w-full' : 'text-gray-950 font-medium w-full'
                                                }`}>
                                                    <div className={`${url === '/transaction/pending' ? "bg-primary-500 font-bold text-white rounded-lg px-3 py-2 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "px-3 py-2 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
                                                        {/* <WalletIcon color='currentColor'/> */}
                                                        <div className="text-sm">
                                                            Pending
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="flex gap-1 items-center pl-4">
                                                <div>
                                                    <CornerDownRight />
                                                </div>
                                                <Link href={route('transaction.history')} className={`${
                                                    url === '/transaction/history' ? 'text-primary-700 font-bold w-full' : 'text-gray-950 font-medium w-full'
                                                }`}>
                                                    <div className={`${url === '/transaction/history' ? "bg-primary-500 font-bold text-white rounded-lg px-3 py-2 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "px-3 py-2 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
                                                        {/* <HistoryIcon color='currentColor'/> */}
                                                        <div className="text-sm">
                                                            Transaction
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {/* <div >
                            {
                                !expanded ? (
                                    <Link href={route('table.table-listing')} className={`${
                                        url === '/table/table-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/table/table-listing' ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <TableIcon color='currentColor' className={`${url === '/table/table-listing' ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('table.table-listing')} className={`${
                                        url === '/table/table-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/table/table-listing' ? "bg-primary-500 font-bold text-white rounded-lg p-3 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "p-3 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
                                            <TableIcon color='currentColor'/>
                                            <div className="text-sm">
                                                Table Listing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div> */}
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('voucher.voucher-listing')} className={`${
                                        url === '/voucher/voucher-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/voucher/voucher-listing' ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <VoucherIcon color='currentColor' className={`${url === '/voucher/voucher-listing' ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('voucher.voucher-listing')} className={`${
                                        url === '/voucher/voucher-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/voucher/voucher-listing' ? "bg-primary-500 font-bold text-white rounded-lg p-3 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "p-3 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
                                            <VoucherIcon color='currentColor'/>
                                            <div className="text-sm">
                                                Voucher Listing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('configuration')} className={`${
                                        url === '/configuration' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/configuration' ? 'p-2 rounded drop-shadow bg-primary-500 hover:bg-primary-600 hover:rounded hover:drop-shadow-md' : 'p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ConfigurationIcon color='currentColor' className={`${url === '/configuration' ? 'text-white' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('configuration')} className={`${
                                        url === '/configuration' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/configuration' ? "bg-primary-500 font-bold text-white rounded-lg p-3 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "p-3 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
                                            <ConfigurationIcon color='currentColor'/>
                                            <div className="text-sm">
                                                Configuration
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <div className="p-2 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md cursor-pointer" onClick={logout}>
                                        <LogoutIcon color='currentColor' className={`text-gray-800`}/>
                                    </div>
                                ) : (
                                    <div className='p-3 flex items-center gap-3 cursor-pointer hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md font-medium' onClick={logout}>
                                        <LogoutIcon color='currentColor'/>
                                        <div className="text-sm">
                                            Logout
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div >
                            {/* {
                                !expanded ? (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <AdminUserIcon color='currentColor' className={`${url === '/admin/my-admin' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <AdminUserIcon color='currentColor'/>
                                            <div className="text-sm">
                                                Admin User
                                            </div>
                                        </div>
                                    </Link>
                                )
                            } */}
                            
                        </div>
                        <div >
                            {/* {
                                !expanded ? (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <MyBillingIcon color='currentColor' className={`${url === '/billing/my-billing' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <MyBillingIcon color='currentColor' />
                                            <div className="text-sm">
                                                My Billing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            } */}
                            
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}