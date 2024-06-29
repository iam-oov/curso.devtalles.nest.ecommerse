import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly productService: ProductsService,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();
    await this.insertNewProducts(firstUser);
    return 'Seed completed';
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      const newUser = {
        ...user,
        password: bcrypt.hashSync(user.password, 11),
      };
      users.push(this.userRepository.create(newUser));
    });

    const dbUsers = await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async deleteTables() {
    // borrar primero los productos
    await this.productService.deleteAllProducts();

    // eliminar todos los usuarios
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewProducts(user: User) {
    this.productService.deleteAllProducts();

    const seedProducts = initialData.products;
    const insertPromises = [];

    seedProducts.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
