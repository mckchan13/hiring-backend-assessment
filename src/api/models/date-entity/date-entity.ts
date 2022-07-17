import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Date {
  @CreateDateColumn()
    created: Date;

  @UpdateDateColumn()
    updated: Date;

  @DeleteDateColumn()
    deleted: Date;
}
