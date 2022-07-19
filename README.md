# Backend Assessment

## Assumptions

### Client Request Assumptions
- I assumed the client would send send data, via POST request body, in the following JSON format:
    ```json
    {
        "vin": "5YJXCBE20GF005643",
        "licenseNumber" : "5KBW943",
        "registrationNumber": "12345",
        "registrationState": "CA",
        "registrationName": "Lebron James",
        "registrationExpirationDate": "2023-7-20",
        "carValue": "125000",
        "currentMileage": "5000",
        "vehicleDescription": "A cool car!"
    }
    ```
- I also assumed that subsequent queries for the listing data would be available via the listing id. In my database schema and API structure, when a new car and listing are created, the listing id is returned to the client. The client is then able to query for, update or delete the listing based on the newly created listing id.

### API Structure
- A single Car controller was created for the singular Car resource.
- The entire controller is wrapped in @JsonController.
- JSON is ubiquitious and the "de facto" data exchange format on the web.
- The entire Car controller also utilizes json parser middleware to parse the body from the request. This makes it easy to manipulate and access the exposed variables in the request body.
- The VIN decoding logic was placed into a custom middleware. This was done to modularize the code, provide some level of abstraction, and make the middleware available for reuse in other controllers or routes.
- Full range CRUD operation routes were added. The client is able to query for car listings, create new listings, update and delete listings.
- Named routes based on the nouns for the resource. Let the HTTP methods communicate the operation needed to enact on the resource.


### Database Structure
- For the database structure I decided to create 2 entities - Car and Listing.
- I considered the fact that each car is unique, but may have multiple listings. Hence, in the entities I created a One-to-Many and Many-to-One relationship between Car and Listing entities.
- When creating a new listing, the server will check for an existing car with the provided VIN number.  If one already exists, it will proceed to create a new listing. If it does not exist, a new Car entity is created, followed by the new listing.
- I separated the Car and Listing entities to reduce database duplication, especially as the database scales. A new listing does not need to keep saving the same Car data - new listings for the same car can reference an existing car in the database since the car properties are "immutable."
- The Car entity is composed of "immutable" and unique properties of the car - the VIN, the make, model and year - these never change about the car (excluding the assumption that the car is heavily modified at some future point in time.)
- The Listing entity is composed of "mutable" properties - in theory the registration data can change.  For example, if ownership changes hands, the car gains more mileage and the car value depreciates over time.
- Vehicle description was also added to Listing entity since new listings may change the vehicle description at the choosing of the lister.
- An eager relation was added to the Listing entity so that when a listing is queried for, it returns the associated car data as well.


## Getting Started

Since I used the same tech stack, the instructions to bring up the server are the same.

To bring up the environment, perform the following steps:

1. Bring up the MySQL database

    ```bash
    # In the project root directory
    docker compose up
    # Exposes database on port 3306
    ```

2. Bring up express server in development mode

    ```bash
    # In a separate terminal session, install necessary packages
    yarn install

    # Exposes express app on port 8889
    yarn dev
    ```
