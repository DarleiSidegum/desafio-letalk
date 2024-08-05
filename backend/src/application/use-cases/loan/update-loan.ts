import { Injectable } from '@nestjs/common';
import { LoanModel } from 'src/domain/models/loan';
import { ILoanRepository } from 'src/domain/repositories/loan-repository';

interface UpdateLoanRequest {
    loan: Partial<LoanModel>;
    loan_id: number;
}

interface UpdateLoanResponse {
    loan: LoanModel;
}

@Injectable()
export class UpdateLoan {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    async execute(request: UpdateLoanRequest): Promise<UpdateLoanResponse> {
        const { loan_id, loan } = request;
        const loan_updated = await this.loanRepository.update(
            loan_id,
            loan,
        );

        return { loan: loan_updated };
    }
}
