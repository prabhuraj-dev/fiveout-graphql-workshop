const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    useremail: String!
    age: Int!
    nationality: Nationality!
    bookedCars: [Car]
  }

  type Car {
    id: ID!
    carmake: String!
    carmodel: String!
    carcompany: String!
  }

  type Order {
    id: ID!
    carid: Int!
    userid: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    cars: [Car!]!
    car(carmake: String!): Car
  }

  type Mutation {
    addUser(input: AddUserInput!): User
    deleteUser(id: ID!): Boolean
    addCar(input: AddCarInput!): Car
    bookCar(input: BookCarInput!): Order
    updateCarModel(input: UpdateCarModelInput!): Car
  }

  type Subscription {
    carChanged: Car
  }

  input AddUserInput {
    username: String!
    useremail: String!
    age: Int!
    nationality: String!
  }

  input AddCarInput {
    carmake: String!
    carmodel: String!
    carcompany: String!
  }

  input BookCarInput {
    carid: Int!
    userid: Int!
  }

  input UpdateCarModelInput {
    id: ID!
    newcarmodel: String!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
    USA
  }
`;

module.exports = { typeDefs };
