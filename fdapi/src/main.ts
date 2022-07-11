import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { env } from 'process';
let app: any;

const options = new DocumentBuilder()
  .setTitle("Main FD API Documentation")
  .setDescription(
    "contains all the shared information for FD API"
  )
  .setVersion("1.0")
  .addTag("v1.0", "dev")
  .build();


export async function swaggerfunc() {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/api", app, document);
  return "done";
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
