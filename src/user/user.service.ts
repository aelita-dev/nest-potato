import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(username: string, email: string, dob: Date, password: string): Promise<User> {
    const exestingUser = await this.userRepository.findOne({ where: [{ username }, {email}] });
    if (exestingUser) {
      throw new ConflictException('User with this username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      dob,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
