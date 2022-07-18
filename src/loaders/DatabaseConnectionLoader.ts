import { Connection, createConnection } from "typeorm";
import { Car, Listing,  } from "../api/models";

export async function DatabaseConnectionLoader(): Promise<Connection> {
  const connection: Connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Car, Listing],
    synchronize: true,
  });
  console.log("[database] connected", connection.name);

  return connection;
}
