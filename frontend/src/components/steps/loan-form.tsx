import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { formatCpf, formatDate, formatMoney, removeNonNumeric, toDecimalNumber } from "@/lib/utils";

interface LoanFormProps{
  onLoanFormSubmitted: (formValue: FormSchema) => void;
}

const formSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: "CPF é obrigatório" })
    .min(11, {message: "CPF inválido"})
    .transform(removeNonNumeric),
  uf: z
    .enum(["ES", "MG", "RJ", "SP"], {message: "UF inválido"}),
  date_birth: z
    .string()
    .min(1, { message: "Data de nascimento obrigatória" }),
  loan_amount: z
    .string()
    .min(1, { message: "Valor do empréstimo é obrigatório" })
    .refine(
      (val) => {
        const num = Number(val.replace(/\D/g, ''));
        return !isNaN(num) && num >= 50000;
      },
      { message: "Valor do empréstimo precisa ser maior que R$ 50.000,00" }
    )
    .transform(toDecimalNumber),   
  monthly_amount: z
    .string()
    .min(1, { message: "Valor das parcelas é obrigatório" })
    .transform(toDecimalNumber),
}).refine((data) => {
  return data.monthly_amount >= (data.loan_amount * 0.01)
}, {
  message: "Valor das parcelas precisa ser maior que 1% do valor do empréstimo",
  path: ["monthly_amount"]
})

export type FormSchema = z.infer<typeof formSchema>;
export function LoanForm({onLoanFormSubmitted}: LoanFormProps) {
  const {register, handleSubmit, control, formState: { errors }} = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
    onLoanFormSubmitted(data);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-md font-semibold text-center mb-4">Preencha o formulário abaixo para simular</h1>
      <div className="bg-white shadow-sm rounded-sm w-full ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-2 px-6 pb-6 pt-10">
              <div className="w-full">
                <Input placeholder="CPF"
                  {...register("cpf", {
                    onChange(e) {
                      const { value } = e.target;
                      e.target.value = formatCpf(value);
                    },
                  })}
                />
                {errors.cpf && <p className="text-red-500 text-xs px-1">{errors.cpf.message}</p>}
              </div>
              <div className="w-full">
                <Controller
                  name="uf"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="UF"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="ES">ES</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="SP">SP</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.uf && <p className="text-red-500 text-xs px-1">{errors.uf.message}</p>}
              </div>
              <div className="w-full">
                <Input placeholder="DATA DE NASCIMENTO" className="w-full" 
                  {...register("date_birth",{
                    onChange(e) {
                      const { value } = e.target;
                      e.target.value = formatDate(value);
                    },
                  })}
                />
                {errors.date_birth  && <p className="text-red-500 text-xs px-1">{errors.date_birth.message}</p>}
              </div>
              <div className="w-full">
                <Input placeholder="QUAL O VALOR DO EMPRÉSTIMO" className="w-full" 
                  {...register("loan_amount",{
                    onChange(e) {
                      const { value } = e.target;
                      e.target.value = formatMoney(value);
                    },
                  })}
                />
                {errors.loan_amount && <p className="text-red-500 text-xs px-1">{errors.loan_amount.message}</p>}
              </div>
              <div className="w-full">
                <Input placeholder="QUAL O VALOR DESEJA PAGAR POR MÊS" className="w-full" 
                  {...register("monthly_amount",{
                    onChange(e) {
                      const { value } = e.target;
                      e.target.value = formatMoney(value);
                    },
                  })}
                />
                {errors.monthly_amount && <p className="text-red-500 text-xs px-1">{errors.monthly_amount.message}</p>}
              </div>
              <Button                 
                type="submit" className="bg-amber-500 hover:bg-amber-600/90 w-full mt-3">
                SIMULAR
              </Button>
          </form>
      </div>
    </div>
  )
}
  