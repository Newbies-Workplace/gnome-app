import { Injectable, NestMiddleware } from "@nestjs/common";
import { MetricsService } from "./metrics";

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private metrics: MetricsService) {}
  use(req, res, next) {
    const originalEnd = res.end;
    res.end = (...args) => {
      this.metrics.httpRequestCounter.inc({
        method: req.method,
        route: req.route?.path || req.originalUrl,
        status_code: res.statusCode,
      });
      originalEnd.apply(res, args);
    };
    next();
  }
}
