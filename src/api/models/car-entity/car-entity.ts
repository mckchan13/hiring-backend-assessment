import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { Listing } from "../listing-entity/listing-entity";
import { Date } from "../date-entity/date-entity";

@Entity("Car")
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    vin: string;

  @Column()
    year: number;

  @Column()
    model: string;

  @Column()
    make: string;

  @Column(() => Date)
    date: Date;

  @OneToMany(() => Listing, (listing) => listing.car)
    listing: Listing[];
}
