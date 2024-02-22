import React, { ForwardedRef, useId } from 'react'

interface SelectProps {
  options: string[]
  label?: string
  className?: string
}

const Select = React.forwardRef(
  (
    { options, label, className, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const id = useId()
    return (
      <div className='w-full'>
        {label && (
          <label htmlFor={id} className='inline-block mb-1 pl-1'>
            {label}
          </label>
        )}
        <select
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          id={id}
          ref={ref}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Select
