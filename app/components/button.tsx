import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

interface Props {
  color?: "primary"
  variant?: "contained" | "outlined"
}

const btn = tv({
  base: 'bg-brand text-white py-7 px-8 rounded text-[28px] font-medium',
  variants: {
    variant: {
      contained: "border-brand",
      outlined: "border bg-transparent text-brand"
    }
  },
  defaultVariants: {
    variant: 'contained'
  }
})

export default function Button({className, color = 'primary', variant, ...rest}: Props & JSX.IntrinsicElements['button']) {
  return <button  {...rest} className={twMerge(btn({ variant }), className)} />
}