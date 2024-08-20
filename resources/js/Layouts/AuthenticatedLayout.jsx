import { useEffect, useState } from 'react';
import SideBar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
// import { CustomToaster } from '@/Components/CustomToaster';



export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) { // md breakpoint (768px)
                setIsSidebarExpanded(true);
            } else {
                setIsSidebarExpanded(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50">
        
        <SideBar expanded={isSidebarExpanded} user={user} showingNavigationDropdown={showingNavigationDropdown} toggleSidebar={toggleSidebar} />

        <div className={`min-h-screen flex flex-col ${isSidebarExpanded ? 'md:ml-60' : 'translate-x-0 md:ml-[74px]'}`}>
            <Navbar header={header} toggleSidebar={toggleSidebar} expanded={isSidebarExpanded}/>

            <main className='w-full flex justify-center p-5 md:p-2'>
                <div className='max-w-[1440px] w-full md:p-5 rounded-xl shadow-container bg-white/60 md:shadow-container'>
                    {children}
                </div>
            </main>
        </div>

        </div>
    );
}
