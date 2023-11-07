import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

interface Props {
  color?: "primary"
  variant?: "contained" | "outlined",
  padding?: "normal" | "flat"
}

const btn = tv({
  base: 'bg-brand text-white py-7 px-8 rounded text-[28px] font-medium',
  variants: {
    variant: {
      contained: "border-brand",
      outlined: "border bg-transparent text-brand"
    },
    padding:  {
      normal:"",
      flat: "p-0"
    }
  },
  defaultVariants: {
    variant: 'contained'
  }
})

export default function Button({className, color = 'primary', variant, padding ='normal', ...rest}: Props & JSX.IntrinsicElements['button']) {
  return <button  {...rest} className={twMerge(btn({ variant, padding }), className)} />
}