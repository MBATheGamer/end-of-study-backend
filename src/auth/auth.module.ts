import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    CommonModule,
    forwardRef(() => UserModule)
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
