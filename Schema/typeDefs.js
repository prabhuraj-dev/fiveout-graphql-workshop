const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    useremail: String!
    age: Int!
    nationality: String!
  }

  type Car {
    id: ID!
    carmake: String!
    carmodel: String!
    carmodelyear: String!
    carvin: String!
    carcompany: String!
    carmileage: Int!
    orderedby: [User]
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    cars: [Car!]!
    car(carmake: String!): Car
  }

  type Mutation {
    addUser(input: AddUserInput!): User
    addCar(input: AddCarInput!): Car
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
    carmodelyear: String!
    carvin: String!
    carcompany: String!
    carmileage: Int!
  }
`;

module.exports = { typeDefs };
