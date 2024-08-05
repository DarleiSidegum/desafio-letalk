import { InstallmentModel } from "src/domain/models/installment";

export class InstallmentViewModel {
    installment_id: number;
    outstanding_balance: number;
    interest: number;
    adjusted_outstanding_balance: number;
    anount: number;
    due_date: number;
    loan_id: number;

    constructor(installment: InstallmentModel) {
        this.installment_id = installment.installment_id;
        this.outstanding_balance = installment.outstanding_balance;
        this.interest = installment.interest;
        this.adjusted_outstanding_balance = installment.adjusted_outstanding_balance;
        this.anount = installment.anount;
        this.due_date = installment.due_date;
        this.loan_id = installment.loan_id;
    }
}
