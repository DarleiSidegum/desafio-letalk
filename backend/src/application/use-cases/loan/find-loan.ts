import { Injectable } from '@nestjs/common';
import { LoanModel } from 'src/domain/models/loan';
import { ILoanRepository } from 'src/domain/repositories/loan-repository';

interface FindLoanRequest {
    filter: Partial<LoanModel>;
}

interface FindLoanResponse {
    loan: LoanModel;
}

@Injectable()
export class FindLoan {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    async execute(request: FindLoanRequest): Promise<FindLoanResponse> {
        const { filter } = request;

        const loan = await this.loanRepository.findOne(filter);

        return { loan };
    }
}
