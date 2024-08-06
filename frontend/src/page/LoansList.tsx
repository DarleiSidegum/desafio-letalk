
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatCpf, formatMoney } from "@/lib/utils";

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

export function LoansList() {
  useEffect(() => {
    handleGetLoans();
  }, []);
  const [loans, setLoans] = useState<Loan[]>([]);

  function handleGetLoans() {
    api.get("/loan/list", {params: {limit: 'all'}})
      .then((response) => {
        if(response.status === 200) {
          setLoans(response.data.items);
        }
      });
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-md font-semibold text-center mb-4">Veja a lista de empréstimos solicitados</h1>
      <div className="bg-white shadow-sm rounded-sm w-full p-6 space-y-12">
        <div>
          <Table>
            <TableHeader className="border-b">
              <TableRow>
                <TableHead className="pl-0 whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">UF</TableHead>
                <TableHead className="whitespace-nowrap">DATA DE NASCIMENTO</TableHead>
                <TableHead className="whitespace-nowrap">VALOR DO EMPRÉSTIMO</TableHead>
                <TableHead className="whitespace-nowrap">VALOR MENSAL</TableHead>
                <TableHead className="whitespace-nowrap">MESES</TableHead>
                <TableHead className="whitespace-nowrap">TOTAL DE JUROS</TableHead>
                <TableHead className="pr-0 whitespace-nowrap">TOTAL A PAGAR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="pl-0 whitespace-nowrap">{formatCpf(loan.cpf)}</TableCell>
                    <TableCell className="whitespace-nowrap">{loan.uf}</TableCell>
                    <TableCell className="whitespace-nowrap">{loan.date_birth}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(loan.loan_amount)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(loan.monthly_amount)}</TableCell>
                    <TableCell className="whitespace-nowrap">{loan.total_months}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatMoney(loan.total_interest)}</TableCell>
                    <TableCell className="pr-0 whitespace-nowrap">{formatMoney(loan.total_amount_payable)}</TableCell>
                  </TableRow>
                )
              })}                
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
  