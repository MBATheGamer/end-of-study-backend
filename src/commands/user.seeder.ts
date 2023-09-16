import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserService } from "../user/user.service";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { randomInt } from "crypto";


(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  for (let i = 0; i < 150; i++) {
    const cin = (20_000_000 + i).toString();
    await userService.create({
      cin,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(cin, 12),
      role: {
        id: 4
      }
    });
  }

  process.exit();
})();