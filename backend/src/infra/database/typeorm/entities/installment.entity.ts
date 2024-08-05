import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { LoanEntity } from './loan.entity';

@Entity('installment')
export class InstallmentEntity {
    @PrimaryGeneratedColumn()
    installment_id: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    outstanding_balance: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    interest: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    adjusted_outstanding_balance: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    anount: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    due_date: number;

    @Column()
    loan_id: number;

    @ManyToOne((type) => LoanEntity, (loan) => loan)
    @JoinColumn({ name: 'loan_id' })
    loan: LoanEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ default: null })
    deleted_at: Date;
}
