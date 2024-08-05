import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface LoanFormProps{
  onLoanFormSubmitted: (step: string) => void;
}

export function LoanForm({onLoanFormSubmitted}: LoanFormProps) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-md font-semibold text-center mb-4">Preencha o formulário abaixo para simular</h1>
        <div className="bg-white shadow-sm rounded-sm w-full ">
            <form className="flex flex-col items-center gap-2 px-6 pb-6 pt-10">
                <Input name="cpf" placeholder="CPF" className="w-full"/>
                <Input name="uf" placeholder="UF" className="w-full"/>
                <Input name="cpf" placeholder="DATA DE NASCIMENTO" className="w-full"/>
                <Input name="cpf" placeholder="QUAL O VALOR DO EMPRÉSTIMO" className="w-full"/>
                <Input name="cpf" placeholder="QUAL O VALOR DESEJA PAGAR POR MÊS" className="w-full"/>
                <Button 
                  onClick={() => onLoanFormSubmitted('loan-preview')}
                  type="submit" className="bg-amber-500 hover:bg-amber-600/90 w-full mt-3">
                  SIMULAR
                </Button>
            </form>
        </div>
      </div>
    )
  }
  