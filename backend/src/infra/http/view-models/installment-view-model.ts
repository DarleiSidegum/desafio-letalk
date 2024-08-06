import { InstallmentModel } from "src/domain/models/installment";

export class InstallmentViewModel {
    installment_id: number;
    remaining_balance: number;
    interest: number;
    adjusted_remaining_balance: number;
    anount: number;
    due_date: Date;
    loan_id: number;

    constructor(installment: InstallmentModel) {
        this.installment_id = installment.installment_id;
        this.remaining_balance = installment.remaining_balance;
        this.interest = installment.interest;
        this.adjusted_remaining_balance = installment.adjusted_remaining_balance;
        this.anount = installment.anount;
        this.due_date = installment.due_date;
        this.loan_id = installment.loan_id;
    }
}
