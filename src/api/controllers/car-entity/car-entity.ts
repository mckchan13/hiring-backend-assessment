import { Body, Get, Put, Delete, JsonController, Post, UseBefore, QueryParams } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";

@JsonController("/car")
export class CarController {
  @Get()
  get(): string {
    return "Returns all cars";
  }

  @Post("/create-listing")
  @UseBefore(VINDecoderMiddleware)
  async create(@Body() body: any, @QueryParams() query: any): Promise<string> {
    console.log("this is the query", query);
    // decode VIN and get year, make, model
    console.log("this is the body", body);
    console.log("hello in post");
    return "Posted to database.";
  }

  @Put("/update-listing")
  @UseBefore(VINDecoderMiddleware)
  async update(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Updated listing to database.";
  }

  @Delete("/delete-listing")
  @UseBefore(VINDecoderMiddleware)
  async delete(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Deleted from database.";
  }
}
