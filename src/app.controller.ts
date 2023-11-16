import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { MigrationService } from './database/knex-migration.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private appService: AppService,
    private readonly migrationService: MigrationService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  public onModuleInit(): void {
    this.migrationService.runMigrations();
  }
}
