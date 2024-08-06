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
    remaining_balance: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    interest: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    adjusted_remaining_balance: number;

    @Column({type: 'decimal', precision: 20, scale: 2})
    anount: number;

    @Column()
    due_date: Date;

    @Column()
    loan_id: number;

    @ManyToOne((type) => LoanEntity, (loan) => loan.installments)
    @JoinColumn({ name: 'loan_id' })
    loan: LoanEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ default: null })
    deleted_at: Date;
}
