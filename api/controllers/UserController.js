/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addNewUser: async (req, res) => {
    const { name, role, email, password } = req.body;
    try {
      await User.create({name, role, email, password});
      return res.ok({message: 'new user created'});
    } catch (error) {
      return res.serverError(error);
    }
  }
};

