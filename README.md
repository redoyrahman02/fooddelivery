# FoodDeliviery API System

FoodDeliviery API System is a NodeJS application

## Installation

You install Docker and make sure docker deamon is up and running

In the project root there is a docker-compose file created.

To start the application, please run

```
docker-compose up -d
```

## Usage

Once the application is up and running, there will be two endpoint available.

The API is accessible using this endpoint

```
localhost:3000
```

The API documentation available at

```
http://localhost:3000/api/

```

The database configuration can be changed from the .env file in the respentive folder.
After making the changes, please rebuild the images using the following command.

```
docker-compose build
```

## ETL(extract, transform and load)

To load data from a data source, you need to store the .json file into this directory
/fdapi/src/restaurants/data
Then run this API to process the data that is provided into that json file
http://localhost:3000/restaurants/load/restaurantsData

## License

[MIT](https://choosealicense.com/licenses/mit/)
