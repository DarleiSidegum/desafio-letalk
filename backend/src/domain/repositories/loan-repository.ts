import { IFilterOptions } from 'src/helpers/interfaces/filter-options';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';
import { LoanModel } from '../models/loan';

export interface FilterLoan
    extends IFilterOptions<Partial<LoanModel>, {}> {}

export abstract class ILoanRepository {
    abstract create(loan: LoanModel): Promise<LoanModel>;
    abstract update(loan_id: number, loan: Partial<LoanModel>): Promise<LoanModel>;
    abstract delete(loan_id: number): Promise<void>;
    abstract findOne(filter: Partial<LoanModel>): Promise<LoanModel | null>;
    abstract findMany(filter: FilterLoan): Promise<IPaginator<LoanModel> | null>;
    abstract findAll(): Promise<LoanModel[] | null>;
}
