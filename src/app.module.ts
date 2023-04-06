import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/mongoose/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/users/user.module';
import { MongooseModelsModule } from './schemas/mongoose-model.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    MongooseModelsModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
