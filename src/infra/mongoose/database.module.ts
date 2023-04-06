import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose.config.service';

@Module({
  imports: [
    // Method-3 - This approach is recommended to use
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
