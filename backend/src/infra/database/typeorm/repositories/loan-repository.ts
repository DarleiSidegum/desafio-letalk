import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';
import { snakeCase } from 'typeorm/util/StringUtils';
import { PaginateCreate } from 'src/infra/common/utils/paginate-create';
import { LoanEntity } from '../entities/loan.entity';
import { LoanModel } from 'src/domain/models/loan';
import { FilterLoan, ILoanRepository } from 'src/domain/repositories/loan-repository';
import { Direction, FilterLimit } from 'src/helpers/interfaces/filter-options';

@Injectable()
export class LoanRepository implements ILoanRepository {
    constructor(
        @InjectRepository(LoanEntity)
        private readonly loanEntityRepository: Repository<LoanEntity>,
    ) {}

    async create(loan: LoanModel): Promise<LoanModel> {
        try {
            const loanCreate = await this.loanEntityRepository.create(loan);

            return await this.loanEntityRepository
                .save(loanCreate)
                .then(async (loanSaved) => {
                    const loanUpdated = await this.findOne({
                        loan_id: loanSaved.loan_id,
                    });
                    return loanUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Erro Create Loan!',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Create Loan!',
                ...error,
            });
        }
    }

    async update(
        loan_id: number,
        loan: Partial<LoanModel>,
    ): Promise<LoanModel> {
        try {
            return await this.loanEntityRepository
                .save({ loan_id, ...loan })
                .then(async (loanSaved) => {
                    const loanUpdated = await this.findOne({
                        loan_id: loanSaved.loan_id,
                    });
                    return loanUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Error Update Loan!',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Update Loan!',
                ...error,
            });
        }
    }

    async delete(loan_id: number): Promise<void> {
        await this.loanEntityRepository.softDelete({ loan_id });
    }

    async findOne(filter: Partial<LoanModel>): Promise<LoanModel> {
        return await this.loanEntityRepository.findOneBy(filter);
    }

    findMany(filter: FilterLoan): Promise<IPaginator<LoanModel>> {
        try {
            let queryBuilder =
                this.loanEntityRepository.createQueryBuilder('loan')
                .leftJoinAndSelect('loan.installments', 'installments');
            let pageFilter = 1,
                limitFilter: FilterLimit = 10;
            if (filter) {
                const { direction, sort, page, limit, text, ...where } = filter;
                if (where) {
                    queryBuilder = queryBuilder.andWhere(where);
                }
                if (page) {
                    pageFilter = page;
                }
                if (limit) {
                    limitFilter = limit;
                }
                if (sort && direction) {
                    queryBuilder = queryBuilder.addOrderBy(
                        snakeCase(sort.replace(/\./g, '_')),
                        direction.toLocaleUpperCase() as Direction,
                    );
                }
            }
            return PaginateCreate<LoanEntity>(
                queryBuilder,
                pageFilter,
                limitFilter,
            );
        } catch (error) {
            console.error(error);
            throw new BadRequestException({
                descricao: 'Error findMany Loan!',
                ...error,
            });
        }
    }

    findAll(): Promise<LoanModel[]> {
        let queryBuilder = this.loanEntityRepository.createQueryBuilder('loan');

        return queryBuilder.getMany();
    }
}
