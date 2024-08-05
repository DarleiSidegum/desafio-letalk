import { IsNotEmpty } from 'class-validator';
import { InstallmentModel } from 'src/domain/models/installment';

export class CreateLoanBody {
    @IsNotEmpty()
    loan_id: number;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    uf: string;

    @IsNotEmpty()
    date_birth: Date;

    @IsNotEmpty()
    loan_amount: number;

    @IsNotEmpty()
    monthly_amount: number;

    @IsNotEmpty()
    total_months: number;

    @IsNotEmpty()
    interest_rate: number;

    @IsNotEmpty()
    total_interest: number;

    @IsNotEmpty()
    total_amount_payable: number;

    @IsNotEmpty()
    installments: InstallmentModel[];
}
