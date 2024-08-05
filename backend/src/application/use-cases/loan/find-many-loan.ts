import { Injectable } from '@nestjs/common';
import { LoanModel } from 'src/domain/models/loan';
import {
    FilterLoan,
    ILoanRepository,
} from 'src/domain/repositories/loan-repository';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';

interface FindManyLoanRequest {
    filter: FilterLoan;
}

interface FindManyLoanResponse {
    loans: IPaginator<LoanModel>;
}

@Injectable()
export class FindManyLoan {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    async execute(
        request: FindManyLoanRequest,
    ): Promise<FindManyLoanResponse> {
        const { filter } = request;

        const loans = await this.loanRepository.findMany(filter);

        return { loans };
    }
}
