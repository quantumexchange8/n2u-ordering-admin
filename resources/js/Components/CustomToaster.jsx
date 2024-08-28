import React from "react";
import { Transition } from "@headlessui/react";
import { toast, Toaster, resolveValue } from 'react-hot-toast';
import { ToastSuccessIcon, ToastErrorIcon, ToastInfoIcon, ToastWarningIcon } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";

const CustomToaster = ({ t }) => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={getClassNames(t)}
          enter="transition-all duration-200"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-200"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="flex gap-3">
            <div className="flex ">
              <div className="flex items-center justify-center rounded-full bg-[#ffffff0d]">
                {getIcon(t)}
              </div>
            </div>
            {
                t.variant === 'variant3' ? (
                  <div className="w-full flex items-center">
                    <p className="font-semibold">{resolveValue(t.title)}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{resolveValue(t.title)}</span>
                      {t.variant !== 'variant3' && <p className="w-full text-gray-900 text-sm">{resolveValue(t.description)}</p>}
                    </div>
                    <div className={`${t.variant === 'variant1' ? 'hidden' : 'block'}`}>
                      {t.variant === 'variant1' && t.actionText && (
                        <Button 
                          className=" text-white bg-[#ffffff0d]"
                          variant='secondary'
                          size="sm"
                          onClick={() => t.action && t.action()}
                        >
                          {t.actionText}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              }
            
            <div>
              <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-white">
                {/* <CloseIcon color='currentColor' /> */}
              </button>
            </div>
          </div>
        </Transition>
      )}
    </Toaster>
  );
};

const getClassNames = (toast) => {
  const baseClass = "transform p-4 rounded-lg shadow-xl flex gap-3 w-[305px]";
  switch (toast.type) {
    case 'success':
      return baseClass + " bg-success-100 border border-secondary-50 text-base text-secondary-800 font-bold ";
    case 'error':
      if (toast.variant === 'warning') {
        // Customize appearance for warning toast
        return baseClass + " bg-gradient-to-r from-warning-950 from-10% to-gray-900 to-90%"; // Example: yellow background for warning
      }
      return baseClass + " bg-gradient-to-r from-error-950 from-10% to-gray-900 to-90%";
    default:
      return baseClass;
  }
};

const getIcon = (toast) => {
  switch (toast.type) {
    case 'success':
      return <ToastSuccessIcon/>;
    case 'error':
      return <ToastErrorIcon />;
    case 'info':
      return <ToastInfoIcon />;
    case 'warning':
      return <ToastWarningIcon />;
    default:
      return null;
  }
};

export { CustomToaster };
