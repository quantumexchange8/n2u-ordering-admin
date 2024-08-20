import React from "react";
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { EinbillLogo } from "@/Components/Icon/logo";
import { ConfigurationIcon, DashboardIcon, MemberIcon, XIcon } from "./Icon/outline";

export default function SideBar({ user, showingNavigationDropdown, expanded, toggleSidebar }) {

    const { url } = usePage();

    return (
        <>
            <div className={`${expanded ? 'fixed inset-0 z-20 bg-black/50 md:hidden' : ''} `} onClick={toggleSidebar}></div>
            <aside className={`fixed inset-y-0 z-20 overflow-auto p-4 max-w-60 bg-gray-25
                scrollbar-thin scrollbar-webkit ease-in-out duration-300
                ${!expanded ? 'translate-x-[-100%] md:translate-x-0 md:w-[75px]' : 'translate-x-0 w-60'}
                ease-in-out duration-300`}
            >
                <nav className="flex flex-col gap-5 rounded-xl shadow-container min-h-[70vh] md:min-h-0 bg-white md:bg-white/60">
                    {!expanded ? (
                        <div className="p-3">
                            <img src="/assets/logo_2.png" alt="" className="w-5"/>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center p-4">
                            <img src="/assets/logo.png" alt="" className="w-12 h-12" />
                            <div className="block md:hidden" onClick={toggleSidebar}>
                                <XIcon />
                            </div>
                        </div>
                    )}
                    <div className={`flex flex-col gap-2 px-2 ${!expanded ? 'items-center': ''}`}>
                        <div>
                            {
                                !expanded ? (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <DashboardIcon color='currentColor' className={`${url === '/dashboard' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'bg-primary-500 font-bold text-white rounded-lg py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md'} `}>
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
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <MemberIcon color='currentColor' className={`${url === '/dashboard' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'bg-primary-500 font-bold text-white rounded-lg py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md'} `}>
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
                                    <Link href={route('configuration')} className={`${
                                        url === '/configuration' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/configuration' ? 'p-3 rounded drop-shadow bg-gray-100 hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ConfigurationIcon color='currentColor' className={`${url === '/configuration' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('configuration')} className={`${
                                        url === '/configuration' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/configuration' ? "bg-primary-500 font-bold text-white rounded-lg py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "py-3 px-4 flex items-center gap-3 font-medium hover:bg-primary-100 hover:rounded hover:text-primary-500 hover:drop-shadow-md" } `}>
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
                            {/* {
                                !expanded ? (
                                    <Link href={route('sales.sales-report')} className={`${
                                        url === '/sales/sales-report' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/sales/sales-report' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <SaleReportIcon color='currentColor' className={`${url === '/sales/sales-report' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('sales.sales-report')} className={`${
                                        url === '/sales/sales-report' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/sales/sales-report' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <SaleReportIcon color='currentColor' />
                                            <div className="text-sm">
                                                Sales Report
                                            </div>
                                        </div>
                                    </Link>
                                )
                            } */}
                            
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
                        <div >
                            {/* {
                                !expanded ? (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ConfigIcon color='currentColor' className={`${url === '/configuration/configuration' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <ConfigIcon color='currentColor' />
                                            <div className="text-sm">
                                                Configuration
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