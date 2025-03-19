import { NestFactory } from "@nestjs/core";

import { AppModule } from "@/app.module";
import { ValidationPipe } from "@nestjs/common";

const morgan = require("morgan");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan("tiny"));
  app.setGlobalPrefix("api/rest/v1");
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
