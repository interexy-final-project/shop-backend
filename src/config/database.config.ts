import { Options } from "@mikro-orm/core";

type ConfigCallback = { database: Options };
export default (): ConfigCallback => ({
  database: {
    type: "postgresql",
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    dbName: process.env.POSTGRES_DB as string,
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"]
  }
});
