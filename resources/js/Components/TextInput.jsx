import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, hasError, placeholder, withIcon = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `bg-white hover:bg-white border border-neutral-100 hover:border-neutral-600 focus:border-primary-500 py-3.5 px-4 text-gray-950 text-base leading-tight rounded-xl shadow-input caret-primary-500
                ${withIcon ? 'pl-11 pr-4' : ''}
                ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none' : 'focus:border-primary-50 focus:ring-[#EDF8FF] hover:border-gray-200 '}` +
                className
            }
            ref={input}
            placeholder={placeholder}
        />
    );
});
