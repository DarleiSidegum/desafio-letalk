import { IsNotEmpty, IsOptional } from 'class-validator';
import { InstallmentModel } from 'src/domain/models/installment';

export class UpdateLoanBody {
    @IsOptional()
    loan_id: number;

    @IsOptional()
    cpf: string;

    @IsOptional()
    uf: string;

    @IsOptional()
    date_birth: string;

    @IsOptional()
    loan_amount: number;

    @IsOptional()
    monthly_amount: number;

    @IsOptional()
    total_months: number;

    @IsOptional()
    interest_rate: number;

    @IsOptional()
    total_interest: number;

    @IsOptional()
    total_amount_payable: number;

    @IsOptional()
    installments: InstallmentModel[];
}
