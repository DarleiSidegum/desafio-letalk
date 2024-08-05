import { ArrowRight } from "phosphor-react";
import { Button } from "../ui/button";

export function LoanPreview() {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-md font-semibold text-center mb-4">Veja a simulação para o seu empréstimo antes de efetivar</h1>
        <div className="bg-white shadow-sm rounded-sm w-full p-6">
            <Button type="button" className="bg-green-500 hover:bg-green-600 w-full mt-3 gap-2">
                EFETIVAR O EMPRÉSTIMO
                <ArrowRight size={20} />
            </Button>
        </div>
      </div>
    )
  }
  