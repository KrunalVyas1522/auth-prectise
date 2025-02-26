import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'myapp_db',
  entities: [Auth],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')], // ✅ Correct path
  synchronize: false,
  migrationsRun: true,
};
