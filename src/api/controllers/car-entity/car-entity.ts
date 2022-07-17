import { Body, Get, JsonController, Post, UseBefore } from "routing-controllers";
import { VINDecoderMiddleware } from "src/api/middlewares/index";

@JsonController("/car")
export class CarController {
  @Get()
  get(): string {
    return "Returns all cars";
  }

  @Post("/create")
  @UseBefore(VINDecoderMiddleware)
  create(@Body() body: any): string {
    // decode VIN and get year, make, model
    console.log(body);
    return "Posted to database.";
  }
}
