import { InstallmentModel } from "./installment";

export class LoanModel {
    loan_id: number;
    cpf: string;
    uf: string;
    date_birth: Date;
    loan_amount: number;
    monthly_amount: number;
    total_months: number;
    interest_rate: number;
    total_interest: number;
    total_amount_payable: number;
    installments: InstallmentModel[];
    created_at: Date;
    updated_at: Date;
}
