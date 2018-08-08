/**
 * MenuController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fetchAll: async (req, res) => {
    const menu = await Menu.find({});
    return res.ok(menu);
  }

};

