import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Car } from "../car-entity/car-entity";

@Entity("Listing")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    licenseNumber: string;

  @Column()
    registrationNumber: number;

  @Column()
    registrationState: string;

  @Column()
    registrationName: string;

  @Column()
    registrationExpirationDate: Date;

  @Column()
    carValue: number;

  @Column()
    currentMileage: number;

  @CreateDateColumn()
    createdDate: Date;

  @UpdateDateColumn()
    updatedDate: Date;

  @DeleteDateColumn()
    deletedDate: Date;

  @ManyToOne(() => Car, (car) => car.listing)
    car: Car;
}
