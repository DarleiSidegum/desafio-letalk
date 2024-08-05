import { Injectable } from '@nestjs/common';
import { LoanModel } from 'src/domain/models/loan';
import { ILoanRepository } from 'src/domain/repositories/loan-repository';

interface CreateLoanRequest extends Partial<LoanModel> {}

interface CreateLoanResponse {
    loan: LoanModel;
}

@Injectable()
export class CreateLoan {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    async execute(request: CreateLoanRequest): Promise<CreateLoanResponse> {
        const loan = new LoanModel();

        Object.assign(loan, request);

        const created_loan = await this.loanRepository.create(loan);

        return { loan: created_loan };
    }
}