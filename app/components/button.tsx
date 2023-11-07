import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

interface Props {
  color?: "primary"
}

const btn = tv({
  base: 'bg-brand text-white py-7 px-8 rounded text-[28px] font-medium'
})

export default function Button({className, color = 'primary', ...rest}: Props & JSX.IntrinsicElements['button']) {
  return <button  {...rest} className={twMerge(btn(), className)} />
}