module.exports = {


  friendlyName: 'Last order number',


  description: 'find last order number',


  inputs: {

  },


  exits: {
    success: {
      description: 'last order stored in database'
    }
  },


  fn: async function (inputs, exits) {
    let lastOrder = await Order.find({
      sort: 'createdAt DESC'
    });
    // All done.
    return exits.success(lastOrder[0]);

  }


};

