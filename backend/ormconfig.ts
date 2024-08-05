import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'src/infra/database/typeorm/naming-strategy';

dotenv.config({
    path: '.env',
});
const booleanString = (word: any) => {
    switch (String(word).toLowerCase().trim()) {
        case 'yes':
        case 'true':
        case '1':
            return true;
        case 'no':
        case 'false':
        case '0':
        case null:
            return false;
        default:
            return Boolean(word);
    }
};
export const config: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'generic_table',
    entities: [__dirname + 'src/infra/database/typeorm/entities/*{.ts,.js}'],
    synchronize: booleanString(process.env.BD_SINCROZAR),
    logging: booleanString(process.env.BD_LOGGING),
    namingStrategy: new SnakeNamingStrategy(),
    timezone: 'Z',
    charset: 'utf8mb4',
};
