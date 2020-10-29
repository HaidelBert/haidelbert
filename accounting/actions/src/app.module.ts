import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AccountingRecordsModule} from "./accounting-records/accounting-records.module";
import {LoggingMiddleware} from "./logging.middleware";


@Module({
  imports: [AccountingRecordsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggingMiddleware)
        .forRoutes('*');
  }
}
