import { LoanModel } from "src/domain/models/loan";
import { InstallmentViewModel } from "./installment-view-model";

export class LoanViewModel {
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
    installments: InstallmentViewModel[];

    constructor(loan: LoanModel) {
        this.loan_id = loan.loan_id;
        this.cpf = loan.cpf;
        this.uf = loan.uf;
        this.date_birth = loan.date_birth;
        this.loan_amount = loan.loan_amount;
        this.monthly_amount = loan.monthly_amount;
        this.total_months = loan.total_months;
        this.interest_rate = loan.interest_rate;
        this.total_interest = loan.total_interest;
        this.total_amount_payable = loan.total_amount_payable;
        this.installments = loan.installments;
    }
}
