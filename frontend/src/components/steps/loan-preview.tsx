import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface LoanFormProps{
  onLoanRestarted: () => void;
  onLoanSent: () => void;
}

export function LoanPreview({
  onLoanRestarted,
  onLoanSent
}: LoanFormProps) {
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
          <div className="grid grid-cols-3 gap-x-6 gap-y-16">
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">VALOR REQUERIDO:</span>
              <span className="text-base font-medium ">R$ 1.000,00</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">TAXA DE JUROS:</span>
              <span className="text-base font-medium ">1% ao mês</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">VALOR QUE DESEJA PAGAR POR MÊS:</span>
              <span className="text-base font-medium ">R$ 15.000,00</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">TOTAL DE MESES PARA QUITAR:</span>
              <span className="text-base font-medium ">5 MESES</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">TOTAL DE JUROS:</span>
              <span className="text-base font-medium ">R$ 1.545,53</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-xs font-medium text-gray-500">TOTAL A PAGAR:</span>
              <span className="text-base font-medium ">R$ 61.545,53</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500">PROJEÇÃO DAS PARCELAS:</span>
            <Table>
              <TableHeader className="border-b">
                <TableRow>
                  <TableHead className="pl-0">SALDO DEVEDOR</TableHead>
                  <TableHead>JUROS</TableHead>
                  <TableHead>SALDO DEVEDOR AJUSTADO</TableHead>
                  <TableHead>VALOR DA PARCELA</TableHead>
                  <TableHead className="pr-0">VENCIMENTO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="pl-0">R$ 1.000,00</TableCell>
                      <TableCell>R$ 600,00</TableCell>
                      <TableCell>R$ 1.600,00</TableCell>
                      <TableCell>R$ 15.000,00</TableCell>
                      <TableCell className="pr-0">20/10/2024</TableCell>
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
          <Button onClick={onLoanSent} type="button" className="bg-green-500 hover:bg-green-600 w-full mt-3 gap-2">
              EFETIVAR O EMPRÉSTIMO
              <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    )
  }
  