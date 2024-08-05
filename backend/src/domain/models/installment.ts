import { LoanModel } from "./loan";

export class InstallmentModel {
    installment_id: number;
    outstanding_balance: number;
    interest: number;
    adjusted_outstanding_balance: number;
    anount: number;
    due_date: number;
    loan_id: number;
    loan: LoanModel;
    created_at: Date;
    updated_at: Date;
}
