import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { FormSchema } from "./loan-form";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatMoney } from "@/lib/utils";

interface LoanFormProps{
  onLoanRestarted: () => void;
  onLoanSent: () => void;
  formValue: FormSchema
}

interface Installment {
  due_date: Date;        
  remaining_balance: number; 
  interest: number; 
  adjusted_remaining_balance: number;
  anount: number;
}

interface Loan {
  cpf: string;
  uf: string;
  date_birth: string;
  loan_amount: number;
  monthly_amount: number;
  total_months: number;
  interest_rate: number;
  total_interest: number;
  total_amount_payable: number;
  installments: Installment[];
}

export function LoanPreview({
  onLoanRestarted,
  onLoanSent,
  formValue
}: LoanFormProps) {

  useEffect(() => {
    handlePreviewLoan(formValue);
  }, []);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const rate_per_state: any = {
    MG: 0.01,  
    SP: 0.008, 
    RJ: 0.009,
    ES: 0.011
  };
  
  const roundNumber = (value: number): number => {
    return parseFloat(value.toFixed(2));
  };

  function handlePreviewLoan(data: FormSchema){
    

    const { loan_amount, monthly_amount, uf } = data; 

    const installments: Installment[] = [];
    let remaining_balance = loan_amount;
    let currentDate = new Date();
  
    while (remaining_balance > 0) {

      const adjusted_remaining_balance = roundNumber(remaining_balance * (1 + rate_per_state[uf]));
      
      const interest = roundNumber(adjusted_remaining_balance - remaining_balance);
  
      const anount = roundNumber(Math.min(monthly_amount, adjusted_remaining_balance));
  
      installments.push({
        due_date: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
        remaining_balance: remaining_balance,
        interest: interest,
        adjusted_remaining_balance: adjusted_remaining_balance,
        anount: anount
      });
  
      remaining_balance = roundNumber(adjusted_remaining_balance - anount);
    }
    
    setInstallments(installments);
    setTotalInterest(roundNumber(installments.reduce((total, installment) => total + installment.interest, 0)));
  }
  
  function handleSentLoan() {
    let loan: Loan = {
      ...formValue, 
      total_months: installments.length,
      interest_rate: rate_per_state[formValue.uf], 
      total_interest: totalInterest, 
      total_amount_payable: roundNumber(formValue.loan_amount + totalInterest),
      installments, 
    };

    api.post("/loan/create", {
        ...loan
      })
      .then((response) => {
        if(response.status === 201) {
          onLoanSent();
        }
      });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        type="button"
        className="flex items-center gap-1 px-0"
        variant={"link"}
        onClick={onLoanRestarted}
      >
        <ArrowLeft weight="bold"/>
        Fazer outra simução
      </Button>
      <h1 className="text-md font-semibold text-center mb-4">Veja a simulação para o seu empréstimo antes de efetivar</h1>
      <div className="bg-white shadow-sm rounded-sm w-full p-6 space-y-12">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-16">
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">VALOR REQUERIDO:</span>
            <span className="text-base font-medium ">{formatMoney(formValue.loan_amount)}</span>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">TAXA DE JUROS:</span>
            <span className="text-base font-medium ">{roundNumber(rate_per_state[formValue.uf] * 100)}% ao mês</span>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">VALOR QUE DESEJA PAGAR POR MÊS:</span>
            <span className="text-base font-medium ">{formatMoney(formValue.monthly_amount)}</span>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">TOTAL DE MESES PARA QUITAR:</span>
            <span className="text-base font-medium ">{installments.length} MESES</span>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">TOTAL DE JUROS:</span>
            <span className="text-base font-medium ">{formatMoney(totalInterest)}</span>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col">
            <span className="text-xs font-medium text-gray-500">TOTAL A PAGAR:</span>
            <span className="text-base font-medium ">{formatMoney(formValue.loan_amount + totalInterest)}</span>
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">PROJEÇÃO DAS PARCELAS:</span>
          <Table>
            <TableHeader className="border-b">
              <TableRow>
                <TableHead className="pl-0 whitespace-nowrap">SALDO DEVEDOR</TableHead>
                <TableHead className="whitespace-nowrap">JUROS</TableHead>
                <TableHead className="whitespace-nowrap">SALDO DEVEDOR AJUSTADO</TableHead>
                <TableHead className="whitespace-nowrap">VALOR DA PARCELA</TableHead>
                <TableHead className="pr-0 whitespace-nowrap">VENCIMENTO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installments.map((task, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="pl-0 whitespace-nowrap">{formatMoney(task.remaining_balance)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(task.interest)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(task.adjusted_remaining_balance)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(task.anount)}</TableCell>
                    <TableCell className="pr-0 whitespace-nowrap">{task.due_date.toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                )
              })}
                <TableRow>
                  <TableCell className="pl-0">R$ 0,00</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="pr-0"></TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button onClick={handleSentLoan} type="button" className="bg-green-500 hover:bg-green-600 w-full mt-3 gap-2">
            EFETIVAR O EMPRÉSTIMO
            <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  )
}
  