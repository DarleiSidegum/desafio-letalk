import { Injectable } from '@nestjs/common';
import { ILoanRepository } from 'src/domain/repositories/loan-repository';

interface DeleteLoanRequest {
    loan_id: number;
}

type DeleteLoanResponse = void;

@Injectable()
export class DeleteLoan {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    async execute(request: DeleteLoanRequest): Promise<DeleteLoanResponse> {
        const { loan_id } = request;

        await this.loanRepository.delete(loan_id);
    }
}
