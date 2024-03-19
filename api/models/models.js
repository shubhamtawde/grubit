// Requiring module
const mongoose = require("mongoose");

// User Modal Schema
const signUp = new mongoose.Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  streetName: { type: String, require: true },
  apt: { type: String, require: true },
  buildingName: { type: String, require: true },
  zip: { type: String, require: true },
  otp: { type: String, require: true },
});

//Restaurant Modal Schema
const restaurant = new mongoose.Schema({
  restaurantName: { type: String, require: true },
  restaurantImage: { type: String, require: true },
  restaurantAddress: { type: String, require: true },
});

//Club Modal Schema
const club = new mongoose.Schema({
  clubID: { type: Number, require: true },
  clubName: { type: String, require: true },
  clubAdd: { type: String, require: true },
  clubImage: { type: String, require: true },
});

//Menu Modal Schema
const menu = new mongoose.Schema({
  restaurantID: { type: Number, require: true },
  menuName: { type: String, require: true },
  menuImage: { type: String, require: true },
  menuDescription: { type: String, require: true },
  menuPrice: { type: String, require: true },
  bestSelling: { type: String, require: true },
});

//Review Modal Schema
const review = new mongoose.Schema({
  restaurantID: { type: Number, require: true },
  reviewName: { type: String, require: true },
  reviewDescription: { type: String, require: true }
});

// Club Booking Modal Schema

const booking = new mongoose.Schema({
 
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  time: { type: String, require: true },
  tableSize: { type: String, require: true },
  date: { type: String, require: true },
  message: { type: String, require: true }
});

//Order History Modal Schema

const orderHistory = new mongoose.Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  emailId: { type: String, require: true },
  restaurantName: { type: String, require: true },
  productName: { type: String, require: true },
  productItem: { type: String, require: true },
  total: { type: String, require: true },
});

// Creating model objects
const User = mongoose.model("project", signUp);
const Res = mongoose.model("restaurant", restaurant);
const Menu = mongoose.model("menu", menu);
const Club = mongoose.model("club", club);
const Review = mongoose.model("review", review);
const ClubBooking = mongoose.model("booking", booking);
const OrderHistory = mongoose.model("orderHistory", orderHistory);

//const signUpUser = mongoose.model('project', signUp);

// Exporting our model objects
module.exports = {
  User,
  Res,
  Menu,
  Review,
  Club,
  ClubBooking,
  OrderHistory
};
