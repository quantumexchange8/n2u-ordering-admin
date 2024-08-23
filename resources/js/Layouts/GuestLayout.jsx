import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col gap-5 sm:justify-center items-center pt-6 sm:pt-0 bg-[#FDFDFD]">
            <div>
                <img src="/assets/logo_2.png" alt="" className='w-32' />
            </div>

            <div className="w-full sm:max-w-md p-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
