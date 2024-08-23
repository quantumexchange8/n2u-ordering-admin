import { Button, CloseButton, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useCallback, useState } from 'react';
import { XIcon } from './Icon/Outline';

export default function Modal({ children, show = false, maxWidth = 'md', maxHeight = 'md', isOpen, close, title, footer, closeIcon, preventCloseOnClickOutside = true }) {

    const maxWidthClass = {
        sm: 'sm:w-[300px] ',
        md: 'max-w-[500px]',
        lg: 'sm:max-w-[800px]',
        xl: 'sm:w-full md:min-w-full lg:min-w-[1024px] xl:min-w-[1140px]',
    }[maxWidth] ;

    const maxHeightClass = {
        sm: 'sm:h-[500px] xl:h-[700px]',
        md: 'h-full md:max-h-[500px]',
        lg: 'min-h-[70vh] md:max-h-600px',
        xl: 'sm:h-full max-h-screen md:h-full lg:min-h-auto xl:min-h-[700px]',
    }[maxHeight];

    const handleOverlayClick = useCallback((e) => {
        if (preventCloseOnClickOutside) {
            e.stopPropagation();
        } else {
            close(); // Close if not preventing
        }
    }, [preventCloseOnClickOutside, close]);

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-20 focus:outline-none" onClose={preventCloseOnClickOutside ? () => {} : close} >

                <div className="fixed inset-0 z-20 w-screen overflow-y-auto" onClick={handleOverlayClick}>
                <div className="flex min-h-full justify-center items-start p-1 md:p-4 bg-black/25">
                    <DialogPanel
                        transition
                        className={`w-full max-w-md rounded-xl bg-white border shadow-md backdrop-blur-2xl duration-150 ease-out data-[closed]:transform-[scale(90%)] data-[closed]:opacity-0 data-[closed]:ease-in ${maxWidthClass} ${maxHeightClass}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogTitle className="m-0 text-lg font-bold text-neutral-950 flex justify-between p-5 bg-white border-b border-gray-100 rounded-t-lg">
                            <div className='w-full'>
                                {title}
                            </div>
                            <CloseButton onClick={close}>
                                {closeIcon}
                                {/* <XIcon /> */}
                            </CloseButton>
                        </DialogTitle>
                        {children}
                        <div className="w-full p-5 bg-white rounded-b-lg shadow-modal">
                            {footer}
                        </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </>
    );
}
