'use client'

import { ForwardRefRenderFunction, forwardRef } from "react"

interface Props {
  label?: string
  requiredField?: boolean
  error?: string 
}

const CInput: ForwardRefRenderFunction<HTMLInputElement, Props & JSX.IntrinsicElements['input']> = ({ id, label, requiredField, autoComplete='off', error, ...rest}, ref) => {
  return (
    <div className="flex flex-col gap-3">
      {label && <label className="text-sm font-medium" htmlFor={id}>{label} {requiredField && <span className="text-red-500">*</span>} </label>}
      <input autoComplete={autoComplete} ref={ref} className="bg-white border rounded-sm w-full px-4 py-3 disabled:bg-gray-200 focus:border-brand outline-none focus:outline-none" {...rest} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
export const Input = forwardRef(CInput)