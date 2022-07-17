import { Body, Get, Put, Delete, JsonController, Post, UseBefore, QueryParams } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";

@JsonController("/car")
export class CarController {
  @Get("/listings")
  get(): string {
    return "Returns all car listings";
  }

  @Post("/create-listing")
  @UseBefore(VINDecoderMiddleware)
  async create(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Posted new listing to database.";
  }

  @Put("/update-listing")
  @UseBefore(VINDecoderMiddleware)
  async update(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Updated listing to database.";
  }

  @Delete("/delete-listing")
  @UseBefore(VINDecoderMiddleware)
  async delete(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Deleted listing from database.";
  }
}
