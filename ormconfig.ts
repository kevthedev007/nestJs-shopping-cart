import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
dotenv.config()

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(<string>process.env.PORT),
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    entities: ["dist/src/**/*.entity.js"],
    synchronize: false,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config;