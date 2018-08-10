/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */
const bcrypt = require('bcryptjs');

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  const admins = await User.find({role: 'admin'});
  if (admins.length === 0) {
    await User.create({
      name: 'admin',
      email: 'admin@email.com',
      role: 'admin',
      password: 'admin',
    });
  }

  if (await Menu.count() > 0) {
    return done();
  }

  await Menu.createEach([
    {
      name: 'nasi goreng',
      price: 17000,
      cookingDuration: 10,
      imageUri: 'http://orsimages.unileversolutions.com/ORS_Images/Knorr_en-LK/Nasi_43_1.1.294_326X580.Jpeg',
    },
    {
      name: 'mie goreng',
      price: 15000,
      cookingDuration: 7,
      imageUri: 'http://www.dapurkobe.co.id/wp-content/uploads/mie-goreng-saus-tiram.jpg',
    },
    {
      name: 'bakso',
      price: 18000,
      cookingDuration: 5,
      imageUri: 'https://i0.wp.com/resepkoki.id/wp-content/uploads/2016/04/Resep-Bakso-urat.jpg?fit=1993%2C2521&ssl=1',
    },
    {
      name: 'sapi lada hitam',
      price: 30000,
      cookingDuration: 15,
      imageUri: 'https://selerasa.com/images/daging/tumis-daging-lada-hitam.jpg',
    },
    {
      name: 'ayam penyet',
      price: 20000,
      cookingDuration: 12,
      imageUri: 'http://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2018/04/29/1968429524.jpg',
    },
  ]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
