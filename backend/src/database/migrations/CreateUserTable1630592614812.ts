// import { MigrationInterface, QueryRunner, Table } from 'typeorm';
//
// export class CreateUserTable1630592614812 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // Criação dos tipos ENUM para role e status
//     await queryRunner.query(
//       `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'COMMON')`,
//     );
//     await queryRunner.query(
//       `CREATE TYPE "user_status_enum" AS ENUM('ACTIVE', 'CANCELLED')`,
//     );
//
//     // Criação da tabela de usuários com as colunas e os tipos ENUM definidos
//     await queryRunner.createTable(
//       new Table({
//         name: 'users',
//         columns: [
//           {
//             name: 'id',
//             type: 'serial',
//             isPrimary: true,
//           },
//           {
//             name: 'firstName',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'lastName',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'email',
//             type: 'varchar',
//             isUnique: true,
//             isNullable: false,
//           },
//           {
//             name: 'password',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'role',
//             type: 'user_role_enum',
//             default: `'COMMON'`,
//           },
//           {
//             name: 'status',
//             type: 'user_status_enum',
//             default: `'ACTIVE'`,
//           },
//           {
//             name: 'createdAt',
//             type: 'timestamp',
//             default: 'CURRENT_TIMESTAMP',
//           },
//           {
//             name: 'updatedAt',
//             type: 'timestamp',
//             default: 'CURRENT_TIMESTAMP',
//             onUpdate: 'CURRENT_TIMESTAMP',
//           },
//         ],
//       }),
//       true,
//     );
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     // Remoção da tabela e dos tipos ENUM
//     await queryRunner.dropTable('users');
//     await queryRunner.query(`DROP TYPE "user_role_enum"`);
//     await queryRunner.query(`DROP TYPE "user_status_enum"`);
//   }
// }