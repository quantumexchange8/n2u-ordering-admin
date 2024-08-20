import { Link } from '@inertiajs/react'

export default ({
    type = 'submit',
    className = '',
    processing,
    children,
    href,
    target,
    external,
    variant = 'primary',
    size = 'base',
    iconOnly,
    squared = false,
    pill = false,
    srText,
    onClick,
    disabled,
}) => {
    const baseClasses = `inline-flex items-center transition-colors font-bold text-center select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none`

    let variantClasses = ``

    switch (variant) {
        case 'gray':
            variantClasses = `bg-neutral-800 text-white hover:bg-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-700`
            break
        case 'black':
            variantClasses = `bg-black text-white hover:bg-neutral-800 disabled:text-neutral-500`
            break
        case 'white':
            variantClasses = `bg-white text-neutral-900 border border-neutral-200 shadow-input hover:bg-neutral-100 disabled:text-neutral-200 disabled:bg-white`
            break
        case 'green':
            variantClasses = `bg-success-500 text-white hover:border hover:border-success-500 hover:text-success-500 hover:bg-black disabled:text-success-400 disabled:border-0 disabled:bg-success-500`
            break
        case 'red':
            variantClasses = `bg-red-500 text-white hover:border hover:border-red-500 hover:text-red-500 hover:bg-black disabled:text-red-400 disabled:border-0 disabled:bg-red-500`
            break
        case 'textOnly':
            variantClasses = `bg-transparent text-primary-500 hover:text-primary-500 hover:bg-primary-100 disabled:text-neutral-700 disabled:bg-transparent`
            break

        // case 'tertiary':
        //     variantClasses = `bg-transparent text-primary-700 text-xs border border-primary-700 rounded hover:border-primary-800 hover:bg-transparent hover:text-primary-800 disabled:text-primary-700 disabled:bg-transparent`
        //     break
        // case 'ghost':
        //     variantClasses = `bg-transparent text-primary-700 underline underline-offset-4 text-xs hover:bg-transparent hover:text-primary-800 hover:underline hover:underline-offset-4 disabled:text-primary-700 disabled:bg-transparent`
        //     break
        // case 'success':
        //     variantClasses = `bg-gradient-to-r from-[#00b827] via-[#06e432] via-[#06d22c] to-[#00c728] text-xs hover:bg-gradient-to-r hover:from-secondary-700 hover:to-secondary-700 text-white`
        //     break
        // case 'gray-primary':
        //     variantClasses = `bg-gray-800 rounded hover:bg-gray-900 text-white text-xs disabled:bg-[#5c6c7b80] disabled:text-gray-100`
        //     break
        // case 'gray-secondary':
        //     variantClasses = `bg-gray-100 hover:bg-gray-200 text-xs text-gray-900 hover:text-gray-950 disabled:bg-gray-100 disabled:text-gray-900`
        //     break
        // case 'gray-border':
        //     variantClasses = `bg-transparent border border-gray-900 hover:border-gray-950 text-xs text-gray-900 hover:text-gray-950 disabled:bg-gray-100 disabled:text-gray-900`
        //     break
        // case 'danger-primary':
        //     variantClasses = `bg-error-600 text-white hover:bg-error-700 text-xs disabled:text-error-50 disabled:bg-[#e71b2580]`
        //     break
        // case 'danger-secondary':
        //     variantClasses = `bg-error-50 text-error-700 hover:bg-error-100 hover:text-error-600 text-xs disabled:text-error-600 disabled:bg-error-50`
        //     break
        // case 'danger-border':
        //     variantClasses = `bg-transparent border border-error-700 hover:border-error-800 text-error-700 hover:text-error-800 text-xs disabled:text-error-600 disabled:bg-error-50`
        //     break
        default:
            variantClasses = `bg-primary-500 text-white text-sm hover:bg-black hover:border hover:border-primary-500 hover:text-primary-500 disabled:text-white disabled:bg-primary-200 rounded-full`
    }

    const sizeClasses = `${
        size == 'sm' ? (iconOnly ? 'p-1.5' : 'px-4 py-3 text-sm font-bold') : ''
    } ${
        size == 'lg' ? (iconOnly ? 'p-3' : 'p-4 text-sm font-semibold') : ''
    }`

    const roundedClasses = `${!squared && !pill ? 'rounded-full' : ''} ${
        pill ? 'rounded-full' : ''
    }`

    const iconSizeClasses = `${size == 'sm' ? 'w-5 h-5' : ''} ${
        size == 'base' ? 'w-6 h-6' : ''
    } ${size == 'lg' ? 'w-7 h-7' : ''}`

    if (href) {
        const Tag = external ? 'a' : Link

        return (
            <Tag
                target={target}
                href={href}
                className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className} ${
                    processing ? 'pointer-events-none opacity-50' : ''
                }`}
                disabled={disabled}
            >
                {children}
                {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
            </Tag>
        )
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className}`}
            disabled={processing || disabled}
            onClick={onClick}
        >
            {children}
            {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
        </button>
    )
}