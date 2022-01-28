const { UserList } = require('../Data/UserList');
const { CarList } = require('../Data/CarList');
const _ = require('lodash');

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //CAR RESOLVERS
    cars: () => {
      return CarList;
    },
    car: (parent, args) => {
      const carmake = args.carmake;
      const car = _.find(CarList, { carmake: carmake });
      return car;
    },
  },
};

module.exports = { resolvers };
