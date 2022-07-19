import { ExpressMiddlewareInterface } from "routing-controllers";
import axios, { AxiosResponse } from "axios";
import { Request } from "express";
import { Car, Listing } from "../../models";
import { entityPropertyOmissions } from "../../controllers/";

export class VINDecoderMiddleware implements ExpressMiddlewareInterface {
  async use(
    request: Request<Omit<Listing & Car, entityPropertyOmissions>>,
    response: unknown,
    next?: (err?: unknown) => void | never,
  ): Promise<void> {
    try {
      const { body } = request;
      const { vin } = body;

      if (!vin || typeof vin !== "string")
        return next({
          log: `Error in ${this.constructor.name}: User did not provide VIN number or VIN format is incorrect.`,
          status: 400,
          message: { error: "Error: Incorrect VIN provided. Please provide a valid VIN number" },
        });

      const URL = process.env.VIN_DECODE_URL + `${vin}?format=json`;

      const decodedVINData: AxiosResponse = await axios.get(URL);

      const { data, status, statusText } = decodedVINData;

      if (status >= 300) {
        return next({
          log: `Error in querying VIN decoder: Error message: ${statusText}`,
          status: status,
          message: { error: `Error: ${statusText}` },
        });
      }

      const { Results } = data;
      const { Make, ModelYear, Model } = Results[0];

      request.body = {
        ...body,
        carValue: +body.carValue,
        currentMileage: +body.currentMileage,
        make: Make,
        year: +ModelYear,
        model: Model,
        registrationExpirationDate: new Date(body.registrationExpirationDate),
        registrationNumber: +body.registrationNumber,
      };

      return next();
    } catch (error) {
      return next({
        error,
      });
    }
  }
}
