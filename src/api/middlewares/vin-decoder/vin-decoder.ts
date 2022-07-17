import { ExpressMiddlewareInterface } from "routing-controllers";
import axios, { AxiosResponse } from "axios";
import { Request } from "express";

// @Middleware({type: "before"})
export class VINDecoderMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request<CarListInput>, response: any, next?: (err?: any) => any): Promise<void> {
    try {
      const { query: { vin } } = request;

      if (!vin || typeof vin !== "string") return next({
        log: `Error in ${this.use}: User did not provide VIN number or VIN format is incorrect.`,
        status: 400,
        message: { error: "Error: Incorrect VIN provided. Please provide a valid VIN number" },
      });

      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;

      const decodedVINData: AxiosResponse<IDecodedVINData, unknown> = await axios.get(url);

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

      request.query = { vin, make: Make, modelYear: ModelYear, model: Model };

      next();
    } catch (error) {
      return next({
        error
      });
    }
  }
}

interface IDecodedVINData {
  Results: DecodedVINData[]
}

interface CarListInput {
  licensePlateNumber: number;
  registrationNumber: number;
  registrationState: States;
  registrationExpiration: Date;
  registrationName: string;
  vin: string;
  carValue: number;
  currentMileage: number;
  vehicleDescription: string;
}

interface DecodedVINData extends CarListInput {
  Model: string;
  ModelYear: string;
  Make: string;
}

enum States {
  CA="CA"
}