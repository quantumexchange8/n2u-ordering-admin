import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import MemberTransactionTable from "./MemberTransactionTable";

export default function MemberDetails({ user, dineWallet, cashWallet, transaction }) {

    return (
        <Authenticated
            header='Member Detail'
        >

            <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl grid g gap-3">
                            <div className="text-neutral-900 text-base font-bold border-b border-neutral-200 py-2">Personal Details</div>
                            <div className="grid grid-cols-2 grid-rows-3 gap-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Name</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Phone</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.phone}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Email</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.email ? user.email : '-'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Rank</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.rank.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Upline</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.upline ? user.upline.name : '-'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-neutral-300">Status</span>
                                    <span className="text-sm text-neutral-900 font-bold">{user.verify != null ? <span className="text-green-600">Verified</span> : <span className="text-red-600">Unverify</span>}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                        <div className="text-neutral-900 text-base font-bold border-b border-neutral-200 py-2">Wallet / Points Details</div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <div className="text-xs text-neutral-300">Dine In Credit Wallet</div>
                                <div className="text-sm text-neutral-900 font-bold">
                                    RM {dineWallet.balance}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-xs text-neutral-300">Cash Wallet Credit</div>
                                <div className="text-sm text-neutral-900 font-bold">
                                    RM {cashWallet.balance}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-xs text-neutral-300">Points</div>
                                <div className="text-sm text-neutral-900 font-bold">
                                    {user.point} pts
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full p-4 shadow-container bg-white/60 md:shadow-container rounded-xl flex flex-col gap-3">
                    <MemberTransactionTable 
                        user={user}
                        transaction={transaction}
                    />
                </div>
            </div>

        </Authenticated>
    )
}