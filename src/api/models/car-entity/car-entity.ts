import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Listing } from "../listing-entity/listing-entity";

@Entity("Car")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column({unique: true})
    vin: string;

  @Column()
    year: number;

  @Column()
    model: string;

  @Column()
    make: string;

  @CreateDateColumn()
    createdDate: Date;

  @UpdateDateColumn()
    updatedDate: Date;

  @DeleteDateColumn()
    deletedDate: Date;

  @OneToMany(() => Listing, (listing) => listing.car)
    listing: Listing[];
}
