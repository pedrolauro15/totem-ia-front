'use client'

import { Input } from "@/app/components/input"
import { api } from "@/app/lib/axios"
import { cpfMask } from "@/app/utils/mask/cpfMast"
import { dateIso } from "@/app/utils/mask/dateIso"
import { dateMask } from "@/app/utils/mask/dateMask"
import { onlyNumbers } from "@/app/utils/mask/onlyNumbers"
import { phoneMask } from "@/app/utils/mask/phoneMask"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from "@/app/utils/validators/registerValidator"
import Link from "next/link"

export default function RegisterPage() {
  const [checked, setChecked] = useState(false)
  const { 
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors }, 
    clearErrors } = useForm({
    resolver: zodResolver(registerSchema),
  })
  const [status, setStatus] = useState<'U' | 'L' | 'E' | 'N'>('U')
  const router = useRouter()

  const cpf = watch('cpf')
  const birth_date = watch('birth_date')

  const isCpfAndBirthDateFullyLoaded = useMemo(() => {
    const parsedCpf = onlyNumbers(cpf)
    const parsedDate = dateIso(birth_date)

    return !!(parsedCpf && parsedDate && parsedCpf.length === 11 && parsedDate.length === 10)

  }, [birth_date, cpf])

  const loadData = useCallback(async () => {
    try {
      const parsedCpf = onlyNumbers(cpf)
      const parsedDate = dateIso(birth_date)
      const result = await api.get<any>('recognitions/person', { params: { cpf: parsedCpf, birth_date: parsedDate } })
      clearErrors()
      if (result.data) {
        setValue('cpf', cpfMask(result.data.cpf))
        setValue('name', result.data.name)

        if (result.data.person_telephones[0]) {
          setValue('telephone', phoneMask(result.data.person_telephones[0].number))
        }
        setStatus('L')
      } else {
        setStatus('N')
      }
    } catch (error) {
      setStatus('E')
      toast('Os dados fornecidos são inválidos!', { type: 'error' })
    }
  }, [cpf, birth_date, setValue, clearErrors])

  async function onSubmit(data: any) {
    try {
      const result = await api.put('recognitions/person', data)
      toast('Cadastro atualizado', { type: 'success' })
      router.push(`/face-upload?ref=${result.data.personId}`)
    } catch (error) {
      toast('Erro ao atualizar dados!', { type: 'error' })
    }

  }

  useEffect(() => {
    if (isCpfAndBirthDateFullyLoaded) {
      loadData()
    }
  }, [isCpfAndBirthDateFullyLoaded, loadData])

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="w-full text-center text-xl front-mediu pb-8 border-b">Dados cadastrais</h1>
      <div className="flex flex-1 pt-10 bg-background">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 px-4">
          <Controller
            control={control}
            name="cpf"
            render={({ field }) =>
              <Input
                error={errors?.cpf?.message as string}
                disabled={!['U', 'N', 'E'].includes(status)}
                requiredField
                label="CPF"
                placeholder="000.000.000-00"
                {...register('cpf')}
                onChange={event => {
                  event.target.value = cpfMask(event.target.value)
                  field.onChange(event.target.value)
                }}
              />}
          />
          <Controller
            name="birth_date"
            control={control}
            render={({ field }) => <Input
              disabled={!['U', 'N', 'E'].includes(status)}
              error={errors?.birth_date?.message as string}
              requiredField
              label="Data de nascimento"
              placeholder="DD/MM/YYYY"
              maxLength={10}
              {...register('birth_date')}
              onChange={event => {
                event.target.value = dateMask(event.target.value);
                field.onChange(event.target.value)
              }}
            />}
          />
          <Input
            disabled={!['U', 'N', 'E'].includes(status)}
            requiredField
            label="Nome completo"
            placeholder="Seu nome"
            {...register('name')}
            error={errors?.name?.message as string}
          />
          <Controller
            name="telephone"
            control={control}
            render={
              ({ field }) => <Input
                error={errors?.telephone?.message as string}
                requiredField
                label="Telefone"
                placeholder="(99) 99999-9999"
                maxLength={15}
                {...register('telephone')}
                onChange={(event) => {
                  event.target.value = phoneMask(event.target.value)
                  field.onChange(event.target.value)
                }}
              />
            }
          />
          <div className="flex items-center gap-2">
            <input
              id="accept-terms"
              type="checkbox"
              onChange={event => {
                setChecked(event.target.checked)
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-700">Li e aceito os <Link className="text-blue-900 underline" target="_blank" href="https://healthdev.io/politica-de-privacidade/">termos de uso e política de privacidade</Link> </label>
          </div>
          <button
            disabled={status === 'U' || status === 'E' || !isCpfAndBirthDateFullyLoaded || !checked}
            className="bg-brand w-full py-4 text-white text-sm rounded disabled:bg-gray-400" type="submit">
            Atualizar dados
          </button>
        </form>
      </div>
    </div>
  )
}