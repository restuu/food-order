module.exports = {


  friendlyName: 'Is admin',


  description: 'check whether the user is admin or not',


  inputs: {
    userId: {
      type: 'number',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const user = await User.findOne({ id: inputs.userId });
    if (user.role !== 'admin') {
      throw 'notAdmin';
    }
    // All done.
    return exits.success(true);

  }


};

