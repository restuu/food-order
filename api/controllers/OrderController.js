/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addNewOrder: async (req, res) => {
    const { user } = res.locals;
    const { orders } = req.body;
    res.ok({id: user.id, orders: JSON.parse(orders)});
  }

};

