import { LoanModel } from "./loan";

export class InstallmentModel {
    installment_id: number;
    remaining_balance: number;
    interest: number;
    adjusted_remaining_balance: number;
    anount: number;
    due_date: Date;
    loan_id: number;
    loan: LoanModel;
    created_at: Date;
    updated_at: Date;
}
