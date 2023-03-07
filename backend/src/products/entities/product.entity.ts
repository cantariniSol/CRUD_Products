import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'


@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    date_joined: Date;

    @Column({ type: 'varchar', unique: true, length: 45 })
    article: number;

    @Column({ unique: true })
    name: string;

    @Column()
    category: string;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price: number;
    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price_sale: number;

    @Column()
    stock: number;
    @Column({ nullable: true })
    image: string;

}