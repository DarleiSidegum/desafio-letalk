import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { InstallmentEntity } from './installment.entity';

@Entity('loan')
export class LoanEntity {
    @PrimaryGeneratedColumn()
    loan_id: number;

    @Column()
    cpf: string;

    @Column()
    uf: string;

    @Column()
    date_birth: string;

    @Column({type: 'decimal', precision: 20, scale: 2})
    loan_amount: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    monthly_amount: number;

    @Column()
    total_months: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    interest_rate: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    total_interest: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    total_amount_payable: number;

    @OneToMany(
        () => InstallmentEntity,
        (installment) => installment.loan,
        {orphanedRowAction: 'soft-delete', cascade: true, eager: true},
    )
    installments: InstallmentEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ default: null })
    deleted_at: Date;
}
