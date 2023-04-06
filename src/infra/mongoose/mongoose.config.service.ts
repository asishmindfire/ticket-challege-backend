import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const username = this.configService.get<string>('DATABASE_USER');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const host = this.configService.get<string>('DATABASE_HOST');
    const db = this.configService.get<string>('DATABASE_NAME');

    const uri = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
