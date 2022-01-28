const { UserList } = require('../Data/UserList');
const { CarList } = require('../Data/CarList');
const { OrderList } = require('../Data/OrderList');
const { PubSub } = require('graphql-subscriptions');
const _ = require('lodash');
const { UserInputError } = require('apollo-server-express');

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

    deleteUser: (parent, args) => {
      const id = args.id;
      const removedUserArr = _.remove(
        UserList,
        (user) => user.id === Number(id)
      );
      return removedUserArr.length > 0 ? true : false;
    },

    //CAR MUTATION RESOLVERS
    addCar: (parent, args) => {
      const car = args.input;
      const lastId = CarList[CarList.length - 1].id;
      car.id = lastId + 1;
      CarList.push(car);

      pubsub.publish('CAR_ADDED', {
        carChanged: {
          carmake: car.carmake,
          carmodel: car.carmodel,
          carcompany: car.carcompany,
        },
      });
      return car;
    },

    updateCarModel: (parent, args) => {
      const { id, newcarmodel } = args.input;
      let carUpdated = {};
      CarList.forEach((car) => {
        if (car.id === Number(id)) {
          car.carmodel = newcarmodel;
          carUpdated = car;
        }
      });
      pubsub.publish('CAR_MODIFIED', {
        carChanged: {
          carmake: carUpdated.carmake,
          carmodel: carUpdated.carmodel,
          carcompany: carUpdated.carcompany,
        },
      });
      return carUpdated;
    },

    bookCar: (parent, args) => {
      const order = args.input;
      const { carid, userid } = args.input;

      const user = _.find(UserList, { id: Number(userid) });
      const car = _.find(CarList, { id: Number(carid) });

      if (!user || !car) {
        throw new UserInputError('Invalid car or user ID');
      }
      const lastId = OrderList[OrderList.length - 1].id;
      order.id = lastId + 1;
      OrderList.push(order);
      return order;
    },
  },

  Subscription: {
    carChanged: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['CAR_ADDED', 'CAR_MODIFIED']),
    },
  },

  User: {
    bookedCars: (user) => {
      let bookedCarList = [];
      const bookedOrders = _.filter(
        OrderList,
        (order) => order.userid === Number(user.id)
      );
      bookedCarList = _.map(bookedOrders, (order) => {
        return _.find(CarList, { id: Number(order.carid) });
      });
      return bookedCarList;
    },
  },
};

module.exports = { resolvers };
