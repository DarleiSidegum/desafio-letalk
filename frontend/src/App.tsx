import { useState } from "react";
import { FormSchema, LoanForm } from "./components/steps/loan-form";
import { LoanPreview } from "./components/steps/loan-preview";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

export function App() {
  const [currentStep, setStep] = useState<string>('loan-form');
  const [formValue, setFormValue] = useState<FormSchema>({} as FormSchema);
  const { toast } = useToast()

  function handleRestartLoan() {
    setStep('loan-form');
  }

  function handleFormSubmitted(data: FormSchema) {
    setFormValue(data);
    setStep('loan-preview');
  }

  function handleSentLoan() {
    setStep('loan-form');
    toast({
      title: "Sucesso!",
      description: "Empréstimo solicitado com sucesso!",
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <h1 className="text-4xl font-light text-center text-gray-400">Simule e solicite seu empréstimo.</h1>
      <>
        {currentStep === 'loan-form' ? (
          <LoanForm onLoanFormSubmitted={(data) => handleFormSubmitted(data)} />
        ) : (
          <LoanPreview formValue={formValue} onLoanRestarted={handleRestartLoan} onLoanSent={handleSentLoan}/>
        )}
      </>
      <Toaster />
    </div>
  )
}
