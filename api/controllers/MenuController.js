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
  },

  addNewMenu: async (req, res) => {
    const { user } = req.locals;
    await sails.helpers.user.isAdmin(user.id)
      .intercept('notAdmin', res.forbidden());

    const { name, price, cookingDuration, description } = req.body;
    const uploaded = await req.file('image').upload({
      adapter: require('skipper-s3'),
      key: sails.config.custom.AWS_KEY,
      secret: sails.config.custom.AWS_SECRET,
      bucket: sails.config.custom.AWS_BUCKET,
      headers: {
        'x-amz-acl': 'public-read',
      }
    });
    console.log(uploaded);
    res.ok();
  }

};

