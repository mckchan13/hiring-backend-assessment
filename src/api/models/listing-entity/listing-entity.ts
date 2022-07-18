import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Car } from "../car-entity/car-entity";
import { Registration } from "../registration-entity/registration-entity";

@Entity("Listing")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    licenseNumber: number;

  @Column(() => Registration)
    registration: Registration;

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
