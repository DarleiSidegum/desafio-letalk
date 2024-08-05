import { LoanForm } from "./components/steps/loan-form";
import { LoanPreview } from "./components/steps/loan-preview";

export function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <h1 className="text-4xl font-light text-center text-gray-400">Simule e solicite seu empréstimo.</h1>
      <LoanForm />
      <LoanPreview />
    </div>
  )
}
