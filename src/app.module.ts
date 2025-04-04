import { Module } from '@nestjs/common';
import { AuthModule } from './infra/controllers/AuthControllers/AuthModule';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
