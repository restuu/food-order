/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { promisify } = require('util');
const cache = require('redis').createClient();

const getCacheAsync = promisify(cache.get).bind(cache);

module.exports = {
  addNewOrder: async (req, res) => {
    const { user } = res.locals;
    const { orders } = req.body;

    const ordersArr = JSON.parse(orders);

    // find last order number
    const lastOrder = await sails.helpers.lastOrderNumber();
    let orderNumber = 1;
    if (lastOrder) {
      orderNumber = lastOrder.orderNumber + 1;
    }

    const arrangedOrder = [];
    ordersArr.forEach((order, index) => {
      arrangedOrder[index] = {};
      arrangedOrder[index].customer = user.id;
      arrangedOrder[index].dish = order.dishId;
      arrangedOrder[index].qty = order.qty;
      arrangedOrder[index].orderNumber = orderNumber;
    });

    await Order.createEach(arrangedOrder);

    return res.ok({message: 'new order created'});
  },

  getCurrentOrder: async (req, res) => {
    const { user } = res.locals;
    const person = await User.findOne({ id: user.id });
    if (person.role !== 'chef') {
      return res.forbidden();
    }

    let currentOrderNumber = await getCacheAsync('lastProcessedOrder');
    currentOrderNumber ? currentOrderNumber++ : currentOrderNumber = 1;

    let currentOrder = await Order.find({ orderNumber: currentOrderNumber })
      .populate('dish');
    return res.ok(currentOrder);
  },

  processOrderById: async (req, res) => {
    const { user } = res.locals;
    const { orderId } = req.params;
    const person = await User.findOne({ id: user.id });
    if (person.role !== 'chef') {
      return res.forbidden();
    }

    let updated = await Order.update({ id: orderId }).set({ chef: user.id }).fetch();

    // // store estimated time completion of certain order queue
    // cache.set()

    return res.ok({ order: updated });
  },

  completeOrderQueue: async (req, res) => {
    const { user } = res.locals;
    const person = await User.findOne({ id: user.id });
    console.log('====================================');
    console.log(person);
    console.log('====================================');
    if (person.role !== 'chef') {
      return res.forbidden();
    }

    const { orderNumber } = req.params;
    let updated = await Order.update({ orderNumber }).set({ isReady: true }).fetch();
    cache.set('lastProcessedOrder', orderNumber);
    res.ok({ order: updated });
  }

};
