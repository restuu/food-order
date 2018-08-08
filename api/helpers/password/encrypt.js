const bcrypt = require('bcryptjs');

module.exports = {


  friendlyName: 'Encrypt',


  description: 'Encrypt password.',


  inputs: {
    password: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'hashed password',
      outputDescription: 'password has been hashed'
    },

    hashError: {
      description: 'hashing error'
    }
  },


  fn: async function (inputs, exits) {
    try {
      let hash = await bcrypt.hash(inputs.password, 10);

      // All done.
      return exits.success(hash);
    } catch (error) {
      sails.log(error);
      throw 'hashError';
    }
  }
};
