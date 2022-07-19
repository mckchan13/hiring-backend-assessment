import { json } from "express";
import { Body, Get, Put, Delete, JsonController, Post, UseBefore } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";
import { Car, Listing } from "../../models";

type entityPropertyOmissions = "id" | "listing" | "car" | "createdDate" | "updatedDate" | "deletedDate";

type listingInputOmissions = "car" | "createdDate" | "updatedDate" | "deletedDate";

interface returnResource<T> {
  message: string;
  resource: T
}

@JsonController("/car")
@UseBefore(json())
export class CarController {
  @Get("/listings")
  async get(): Promise<returnResource<Listing[]>> {
    const allListings = await Listing.find();
    return {
      message: "All listings found.",
      resource: allListings
    };
  }

  @Post("/create-listing")
  @UseBefore(VINDecoderMiddleware)
  async create(@Body() body: Omit<Listing & Car, entityPropertyOmissions>): Promise<returnResource<Listing>> {
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
    return {
      message:`Posted new listing to database. Created Listing id: ${listingId}`,
      resource: newListing
    };
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