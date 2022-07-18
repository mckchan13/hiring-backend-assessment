import { Column } from "typeorm";

export class Registration {
  @Column()
    number: number;

  @Column()
    state: string;

  @Column()
    name: string;

  @Column()
    expirationDate: Date;
}
