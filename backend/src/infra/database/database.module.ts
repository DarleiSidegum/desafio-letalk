import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './typeorm/entities/loan.entity';
import { ILoanRepository } from 'src/domain/repositories/loan-repository';
import { LoanRepository } from './typeorm/repositories/loan-repository';
import { InstallmentEntity } from './typeorm/entities/installment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LoanEntity,
            InstallmentEntity
        ]),
    ],
    providers: [
        {
            provide: ILoanRepository,
            useClass: LoanRepository,
        },
    ],
    exports: [
        ILoanRepository,
    ],
})
export class DatabaseModule {}
