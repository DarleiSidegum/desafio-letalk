import { Controller, Get } from '@nestjs/common';
import {
    Body,
    Delete,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common/decorators';
import { LoanViewModel } from '../view-models/loan-view-model';
import { CreateLoan } from 'src/application/use-cases/loan/create-loan';
import { UpdateLoan } from 'src/application/use-cases/loan/update-loan';
import { FindManyLoan } from 'src/application/use-cases/loan/find-many-loan';
import { FindLoan } from 'src/application/use-cases/loan/find-loan';
import { DeleteLoan } from 'src/application/use-cases/loan/delete-loan';
import { FilterLoan } from 'src/domain/repositories/loan-repository';
import { CreateLoanBody } from '../dtos/create-loan-body';
import { UpdateLoanBody } from '../dtos/update-loan-body';

@Controller('loan')
export class LoanController {
    constructor(
        private createLoan: CreateLoan,
        private updateLoan: UpdateLoan,
        private findManyLoan: FindManyLoan,
        private findLoan: FindLoan,
        private deleteLoan: DeleteLoan,
    ) {}

    @Post(['', 'create'])
    async create(@Body() body: CreateLoanBody) {
        const { loan } = await this.createLoan.execute(body);
        return new LoanViewModel(loan);
    }

    @Put(':loan_id')
    async update(
        @Param('loan_id') loan_id: string,
        @Body() body: UpdateLoanBody,
    ) {
        const { loan } = await this.updateLoan.execute({
            loan_id: +loan_id,
            loan: body,
        });
        return new LoanViewModel(loan);
    }

    @Get(['', 'list'])
    async findMany(@Query() filter: FilterLoan) {
        const { loans } = await this.findManyLoan.execute({ filter });
        loans.items.map((loan) => new LoanViewModel(loan));

        return loans;
    }

    @Get(':loan_id')
    async findById(@Param('loan_id') loan_id: string) {
        const { loan } = await this.findLoan.execute({
            filter: { loan_id: +loan_id },
        });
        return new LoanViewModel(loan);
    }

    @Delete(':loan_id')
    async delete(@Param('loan_id') loan_id: string) {
        await this.deleteLoan.execute({ loan_id: +loan_id });
        return;
    }
}
