import { json } from "express";
import { Body, Get, Put, Delete, JsonController, Post, UseBefore } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";
import { Car, Listing } from "../../models";

type entityPropertyOmissions = "id" | "listing" | "car" | "createdDate" | "updatedDate" | "deletedDate";
type listingInputOmissions = "car" | "createdDate" | "updatedDate" | "deletedDate";

@JsonController("/car")
@UseBefore(json())
export class CarController {
  @Get("/listings")
  get(): string {
    return "Returns all car listings";
  }

  @Post("/create-listing")
  @UseBefore(VINDecoderMiddleware)
  async create(@Body() body: Omit<Listing & Car, entityPropertyOmissions>): Promise<string> {
    const { vin } = body;
    const existingCar = await Car.find({
      where: {
        vin,
      }
    });
    const carIsFound = !!existingCar.length;
    const car = carIsFound ? existingCar[0] : await Car.create(body).save();
    const newListing = await Listing.create({...body, car }).save();
    const { id: listingId } = newListing;
    return `Posted new listing to database. Created Listing id: ${listingId}`;
  }

  @Put("/update-listing")
  async update(@Body() body: Omit<Listing, listingInputOmissions>): Promise<string> {
    const { id: listingId } = body;
    await Listing.update(listingId, body);
    return `Updated listing to database. Updated Listing id: ${listingId}`;
  }

  @Delete("/delete-listing")
  async delete(@Body() body: Omit<Listing, listingInputOmissions>): Promise<string> {
    const { id: listingId } = body;
    await Listing.delete(listingId);
    return `Deleted listing from database. Deleted Listing id: ${listingId}`;
  }
}

// 97449fbf-d1e7-45ea-be98-900952acaa20

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