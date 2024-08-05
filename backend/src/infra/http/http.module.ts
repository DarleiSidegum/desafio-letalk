import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LoanController } from './controllers/loan.controller';
import { CreateLoan } from 'src/application/use-cases/loan/create-loan';
import { UpdateLoan } from 'src/application/use-cases/loan/update-loan';
import { DeleteLoan } from 'src/application/use-cases/loan/delete-loan';
import { FindLoan } from 'src/application/use-cases/loan/find-loan';
import { FindManyLoan } from 'src/application/use-cases/loan/find-many-loan';

const USE_CASES_LOAN = [
    CreateLoan,
    UpdateLoan,
    DeleteLoan,
    FindLoan,
    FindManyLoan
];

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        LoanController,
    ],
    providers: [
        ...USE_CASES_LOAN,
    ],
    exports: [],
})
export class HttpModule {}
