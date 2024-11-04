import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findAll({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Adiciona a condição de busca se search estiver presente
    if (search) {
      queryBuilder.where(
        'user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    // Pega os usuários com paginação
    const [users, totalItems] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: users,
      meta: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
      status: 'success',
      message: 'Users fetched successfully',
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  async getUserStats(): Promise<any> {
    const activeAdmins = await this.userRepository.count({
      where: { role: UserRole.ADMIN, status: UserStatus.ACTIVE },
    });
    const cancelledAdmins = await this.userRepository.count({
      where: { role: UserRole.ADMIN, status: UserStatus.INATIVE },
    });
    const activeCommon = await this.userRepository.count({
      where: { role: UserRole.COMMON, status: UserStatus.ACTIVE },
    });
    const cancelledCommon = await this.userRepository.count({
      where: { role: UserRole.COMMON, status: UserStatus.INATIVE },
    });

    return {
      activeAdmins,
      cancelledAdmins,
      activeCommon,
      cancelledCommon,
    };
  }
}
