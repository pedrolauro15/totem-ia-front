'use client'

import { Input } from "@/app/components/input"
import { api } from "@/app/lib/axios"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const { register, watch, handleSubmit, setValue } = useForm()
  const [status, setStatus] = useState<'U' | 'L' | 'E' | 'N'>('U')
  const router = useRouter()

  const cpf = watch('cpf')
  const birth_date = watch('birth_date')



  const isCpfAndBirthDateFullyLoaded = useMemo(() => {
    return dayjs(birth_date).isValid() && dayjs(birth_date).isAfter(dayjs('1930-01-01')) && cpf && cpf?.length === 11
  }, [birth_date, cpf])

  const loadData = useCallback(async () => {
    try {
      const result = await api.get<any>('recognitions/person', { params: { cpf, birth_date } })
      if (result.data) {
        setValue('cpf', result.data.cpf)
        setValue('name', result.data.name)

        if (result.data.person_telephones[0]) {
          setValue('telephone', result.data.person_telephones[0].number)
        }
        setStatus('L')
      } else {
        setStatus('N')
      }
    } catch (error) {
      setStatus('E')
      toast('Os dados fornecidos são inválidos!', { type: 'error' })
    }
  }, [cpf, birth_date, setValue])

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
      <h1 className="w-full text-center text-xl front-mediu pb-8 border-b">Dados gerais</h1>
      <div className="flex flex-1 pt-10 bg-background">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 px-4">
          <Input disabled={!['U', 'N', 'E'].includes(status)} requiredField label="CPF" placeholder="000.000.000-00" {...register('cpf')} />
          <Input disabled={!['U', 'N', 'E'].includes(status)} requiredField type="date" label="Data de nascimento" {...register('birth_date')} />
          <Input disabled={!['U', 'N', 'E'].includes(status)} requiredField label="Nome completo" placeholder="Seu nome" {...register('name')} />
          <Input requiredField label="Telefone" placeholder="(99) 99999-9999" {...register('telephone')} />
          <button disabled={status === 'U' || status === 'E'} className="bg-brand w-full py-4 text-white text-sm rounded disabled:bg-gray-400" type="submit">Atualizar dados</button>
        </form>
      </div>
    </div>
  )
}