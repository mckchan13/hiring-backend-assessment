import { json } from "express";
import { Body, Get, Put, Delete, JsonController, Post, UseBefore, QueryParams } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";
import { Car, Listing } from "../../models";

@JsonController("/car")
export class CarController {
  @Get("/listings")
  get(): string {
    return "Returns all car listings";
  }

  @Post("/create-listing")
  @UseBefore(json(), VINDecoderMiddleware)
  async create(@Body() body: Omit<Listing, "id" | "date" | "car">, @QueryParams() query: Omit<Car, "id" | "date" | "listing">): Promise<string> {
    const car = await Car.create({...query, year: +query.year}).save();
    await Listing.create({...body, car }).save();
    return "Posted new listing to database.";
  }

  @Put("/update-listing")
  @UseBefore(json(), VINDecoderMiddleware)
  async update(@Body() body: Omit<Listing, "id" | "date" | "car">, @QueryParams() query: Omit<Car, "id" | "date" | "listing">): Promise<string> {
    const listing = new Listing();
    return "Updated listing to database.";
  }

  @Delete("/delete-listing")
  @UseBefore(json(), VINDecoderMiddleware)
  async delete(@Body() body: any, @QueryParams() query: any): Promise<string> {
    return "Deleted listing from database.";
  }
}


// const { vin, make, model, year } = query;
// const car = new Car();
// car.vin = vin;
// car.make = make;
// car.model = model;
// car.year = +year;
// await car.save();

// const { licenseNumber, registrationName, registrationState, registrationExpirationDate, carValue, currentMileage } = body;
// const listing = new Listing();
// listing.licenseNumber = licenseNumber;
// listing.registrationName = registrationName;
// listing.registrationState = registrationState;
// listing.registrationExpirationDate = registrationExpirationDate;
// listing.carValue = carValue;
// listing.currentMileage = currentMileage;
// listing.car = car;
// await listing.save();