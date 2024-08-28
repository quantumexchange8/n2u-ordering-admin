export default ({ icon, children }) => {
    return (
        <div className="relative text-gray-500 focus-within:text-gray-900 dark:focus-within:text-gray-400">
            <div
                aria-hidden="true"
                className="absolute inset-y-0 flex items-center pl-3 pointer-events-none"
            >
                {icon}
            </div>
            {children}
        </div>
    )
}