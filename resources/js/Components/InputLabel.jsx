export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-xs text-neutral-500 ` + className}>
            {value ? value : children}
        </label>
    );
}
