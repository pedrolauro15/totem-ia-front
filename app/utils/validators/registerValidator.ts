import { z } from "zod";
import { onlyNumbers } from "../mask/onlyNumbers";
import { uppercase } from "../mask/uppercase";
import { dateIso } from "../mask/dateIso";
import { validateCpf } from "../valiodateCpf";

export const registerSchema = z.object({
  cpf: z.string().length(14, "CPF inválido").transform(onlyNumbers).refine(cpf => {
    return validateCpf(cpf)
  }, { message: 'CPF inválido' }),
  birth_date: z.string().min(10, 'Data de nascimento inválida').transform(dateIso),
  name: z.string().min(3).transform(uppercase),
  telephone: z.string().length(15, 'Telefone inválido').transform(onlyNumbers)
})