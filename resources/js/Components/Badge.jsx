import React from 'react';

const Admin = () => {
    return (
        <div className='flex md:inline-flex px-2 justify-center items-center border rounded-[100px] border-warning-400'>
            <span className='text-warning-400 text-xss '>Admin</span>
        </div>
    );
}

const Merchant = () => {
    return (
        <div className='flex md:inline-flex px-2 justify-center items-center border rounded-[100px] border-success-400'>
            <span className='text-success-400 text-xss leading-none'>Merchant</span>
        </div>
    );
}

const Success = () => {
    return (
        <div className='flex md:inline-flex px-3 py-0.5 justify-center items-center border rounded-[100px] border-success-500 bg-success-500'>
            <span className='text-white text-xs font-medium leading-tight'>Success</span>
        </div>
    );
}

const Rejected = () => {
    return (
        <div className='flex md:inline-flex px-1 py-0.5 justify-center items-center border rounded-[100px] border-error-500 bg-error-500'>
            <span className='text-white text-xs font-medium leading-tight'>Rejected</span>
        </div>
    );
}

const Expired = () => {
    return (
        <div className='flex md:inline-flex px-3 py-0.5 justify-center items-center border rounded-[100px] border-error-600 bg-[#dc26261a]'>
            <span className='text-error-600 text-xs font-medium leading-tight'>Expired</span>
        </div>
    );
}

const Freeze = () => {
    return (
        <div className='flex md:inline-flex px-3 py-0.5 justify-center items-center border rounded-[100px] border-secondary-500 bg-[#2f72ff1a]'>
            <span className='text-secondary-500 text-xs font-medium leading-tight'>Freeze</span>
        </div>
    );
}

const Pending = () => {
    return (
        <div className='flex md:inline-flex px-3 py-0.5 justify-center items-center border rounded-[100px] border-info-500 bg-info-500'>
            <span className='text-white text-xs font-medium leading-tight'>Pending</span>
        </div>
    );
}

const Processing = () => {
    return (
        <div className='flex md:inline-flex px-3 py-0.5 justify-center items-center border rounded-[100px] border-warning-500 bg-[#f59e0b1a]'>
            <span className='text-warning-500 text-xs font-medium leading-tight'>Processing</span>
        </div>
    );
}

export { Admin, Merchant, Success, Rejected, Expired, Pending, Freeze, Processing };