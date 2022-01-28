const { UserList } = require('../Data/UserList');
const { CarList } = require('../Data/CarList');
const { PubSub } = require('graphql-subscriptions');
const _ = require('lodash');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    //USER QUERY RESOLVERS
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //CAR QUERY RESOLVERS
    cars: () => {
      return CarList;
    },
    car: (parent, args) => {
      const carmake = args.carmake;
      const car = _.find(CarList, { carmake: carmake });
      return car;
    },
  },

  Mutation: {
    //USER MUTATION RESOLVERS
    addUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    //CAR MUTATION RESOLVERS
    addCar: (parent, args) => {
      const car = args.input;
      const lastId = CarList[CarList.length - 1].id;
      car.id = lastId + 1;
      CarList.push(car);

      pubsub.publish('CAR_ADDED', {
        carAdded: {
          carmake: car.carmake,
          carmodel: car.carmodel,
          carcompany: car.carcompany,
        },
      });
      return car;
    },
  },

  Subscription: {
    carAdded: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator('CAR_ADDED'),
    },
  },
};

module.exports = { resolvers };
