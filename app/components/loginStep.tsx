interface Props {
  extraText?: string
  stepTitle: string
  stepDescription: string
}

export default function LoginStep({
  extraText,
  stepDescription,
  stepTitle,
}: Props) {
  return (
    <li className="flex gap-5">
      <span className="bg-brand/10 text-brand font-bold h-fit py-2 px-4 text-base rounded-sm">
        {stepTitle}
      </span>
      <div className="text-xl leading-relaxed text-gray-700">
        {stepDescription}
        {extraText && <h2 className="text-brand text-3xl mt-2">{extraText}</h2>}
      </div>
    </li>
  )
}
