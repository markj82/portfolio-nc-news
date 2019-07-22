# API Northcoders News

This project was to develop RESTful API using Node, Express, Knex and PostgreSQL.

The API provides various endpoints with the use of queries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* node version 11.14.0
* postgresSQL 11
* knex 0.17.6

Dependencies

* express: 4.17.1
* knex: 0.17.6
* chai: 4.2.0
* chai-sorted: 0.2.0
* mocha: 6.1.4
* supertest: 4.0.2

### Installing

1. Fork this repository and clone it to your local machine

```
git clone https://github.com/<your-github-username>/portfolio-nc-news.git
```

2. Navigate to repository folder

```
cd portfolio-nc-news
```

3. Install all necessary dependencies
```
npm install
```

4. Create knexfile.js in the root directory and paste this code:
```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {

  production: {
    connection: `${DB_URL}?ssl=true`,
  },

  development: {
    connection: {
      database: 'nc_news'
      // username,
      // password
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // username,
      // password
    }
  }
};       

module.exports = { ...customConfig[ENV], ...baseConfig };
```

5. Setup the database with these commands: 
```
npm run setup-dbs
npm run seed
```

## Running the tests

To run the tests, input the following command in your terminal:
```
npm test
```

### Testing

```
GET /api/users/:username
```
Test for returning an object of the passed user with all properties. Also tested for when no user has been found

```
GET /api/topics
```
Test for returning an array of topic objects

```
GET /api/articles
```
Test for returning an array of articles objects with all correct properties

```
GET /api/articles/:article_id
```
Test that an article object is returned with the correct properties. It returns an error when invalid or non exist article_id is passed

```
PATCH /api/articles/:article:id
```
Test for the vote property is updated when passed an object with inc_votes and a valid number. It returns an error if inc_votes value is invalid.

```
POST /api/articles/:article_id/comments
```
Test for ensure that the response is a new comment with specific article_id

```
GET /api/articles/:article_id/comments
```
Test for returning array of comments for the specific article_id

```
PATCH /api/comments/:comment_id
```
Test for response with updated comment with changes made to their vote property. If comment_id does not exists, it will respond with an error

```
DELETE /api/comments/:comment_id
```
Test for ensure that comment with comment_id was deleted. If comment_id does not exists, it will respond with an error

## Deployment

This API has been deployed to Heroku:

https://nc-mj-news.herokuapp.com/api


## Versioning

1.0

## Author

Marek Jaszczuk