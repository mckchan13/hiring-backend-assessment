import { json, Response } from "express";
import { Body, Get, Put, Delete, JsonController, Post, UseBefore, Res } from "routing-controllers";
import { VINDecoderMiddleware } from "../../middlewares";
import { Car, Listing } from "../../models";

export type entityPropertyOmissions = "id" | "listing" | "car" | "createdDate" | "updatedDate" | "deletedDate";

export type listingInputOmissions = "car" | "createdDate" | "updatedDate" | "deletedDate";

export interface returnResource<T> {
  message: string;
  resource: T
}

@JsonController("/car")
@UseBefore(json())
export class CarController {
  @Get("/listing")
  async get(@Res() response: Response): Promise<returnResource<Listing[]>> {
    const allListings = await Listing.find();
    response.status(200);
    return {
      message: "All listings found.",
      resource: allListings
    };
  }

  @Post("/listing")
  @UseBefore(VINDecoderMiddleware)
  async create(@Body() body: Omit<Listing & Car, entityPropertyOmissions>, @Res() response: Response): Promise<returnResource<Listing>> {
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
    response.status(201);
    return {
      message:`Posted new listing to database. Created Listing id: ${listingId}`,
      resource: newListing
    };
  }

  @Put("/listing")
  async update(@Body() body: Omit<Listing, listingInputOmissions>, @Res() response: Response): Promise<string> {
    const { id: listingId } = body;
    await Listing.update(listingId, body);
    response.status(200);
    return `Updated listing to database. Updated Listing id: ${listingId}`;
  }

  @Delete("/listing")
  async delete(@Body() body: Omit<Listing, listingInputOmissions>, @Res() response: Response): Promise<string> {
    const { id: listingId } = body;
    await Listing.delete(listingId);
    response.status(204);
    return `Deleted listing from database. Deleted Listing id: ${listingId}`;
  }
}