const bcrypt = require('bcryptjs');

module.exports = {


  friendlyName: 'Decrypt',


  description: 'Decrypt password.',


  inputs: {
    hash: {
      description: 'hashed password in db',
      type: 'string',
      required: true
    },
    password: {
      description: 'raw password',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'password matched'
    },
    error: {
      outputDescription: 'wrong password'
    },
    wrongPassword: {
      outputDescription: 'wrong password'
    }
  },


  fn: async function (inputs, exits) {
    try {
      let isMatch = await bcrypt.compare(inputs.password, inputs.hash);
      if (isMatch) {
        return exits.success(true);
      }
      return exits.wrongPassword({status: 400});
    } catch (error) {
      sails.log(error);
    }
  }
};

