import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Car } from "../car-entity/car-entity";
import { Date } from "../date-entity/date-entity";

@Entity("Listing")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    licenseNumber: number;

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

  @Column(() => Date)
    date: Date;

  @ManyToOne(() => Car, (car) => car.listing)
    car: Car;
}
