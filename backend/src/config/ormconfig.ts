// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import path from 'path';
// import { Auth } from 'src/auth/entities/auth.entity';
// // import { User } from '../users/user.entity';

// export const ormConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '',
//   database: 'myapp_db',
// //   entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')], // Auto-load entities
// //   migrations: [path.join(__dirname, '../migrations/*.ts')],
//   entities: [Auth], // ✅ Use entity class directly
//   migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')], // ✅ Correct migration path
//   synchronize: false, // Use migrations instead of sync
//   migrationsRun: true, // Auto-run migrations on startup
// };

import { DataSource } from 'typeorm';
import * as path from 'path';
import { Auth } from '../auth/entities/auth.entity'; // ✅ Use relative import

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'myapp_db',
  entities: [Auth], // ✅ Use entity class directly
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')], // ✅ Correct migration path
  synchronize: false,
  migrationsRun: true,
});



