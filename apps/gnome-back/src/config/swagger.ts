import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Krasnal GO")
    .addBearerAuth({
      type: "apiKey",
      in: "header",
      name: "Authorization",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);
}
