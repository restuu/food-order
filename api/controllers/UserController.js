/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');

module.exports = {
  addNewUser: async (req, res) => {
    const { name, role, email, password } = req.body;

    try {
      // find if user already exist or not
      let isExist = await User.findOne({email});
      if (isExist) {
        return res.badRequest({ message: 'user with this email already exist' });
      }
      await User.create({name, role, email, password});
      return res.status(201).json({message: 'new user created'});
    } catch (error) {
      return res.serverError(error);
    }
  },

  userLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.badRequest({ message: 'no user with this email' });
      }

      let passwordMatch = await sails.helpers.password.decrypt.with({
        password,
        hash: user.password,
      });

      console.log('====================================');
      console.log(passwordMatch);
      console.log('====================================');
      if (passwordMatch) {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, sails.config.custom.SECRET_KEY);
        return res.ok({token});
      }
    } catch (error) {
      if (error.raw.status === 400) {
        return res.badRequest();
      }
      return res.serverError(error);
    }
  }
};

