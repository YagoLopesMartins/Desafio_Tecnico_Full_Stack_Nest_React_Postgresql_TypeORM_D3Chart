// import { User, UserRole, UserStatus } from '../../user/user.entity';
// import * as bcrypt from 'bcrypt';
//
// async function seedUsers() {
//   const userRepository = AppDataSource.getRepository(User);
//
//   const admin = new User();
//   admin.firstName = 'Admin';
//   admin.lastName = 'User';
//   admin.email = 'admin@example.com';
//   admin.password = await bcrypt.hash('admin123', 10);
//   admin.role = UserRole.ADMIN;
//   admin.status = UserStatus.ACTIVE;
//   await userRepository.save(admin);
// }
//
// AppDataSource.initialize().then(async () => {
//   await seedUsers();
//   await AppDataSource.destroy();
// });
