import { config } from './../ormconfig';
import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
        HttpModule,
        DatabaseModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule {
}
