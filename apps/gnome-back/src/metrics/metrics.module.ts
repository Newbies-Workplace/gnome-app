import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { PrismaModule } from "@/db/prisma.module";
import { MetricsService } from "@/metrics/metrics";
import { MetricsCron } from "@/metrics/metrics.cron";
import { MetricsMiddleware } from "@/metrics/metrics.middleware";

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
  ],
  providers: [MetricsCron, MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes("*");
  }
}
