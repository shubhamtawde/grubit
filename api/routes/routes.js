const {
  User,
  Res,
  Menu,
  Review,
  Club,
  ClubBooking,
  OrderHistory
} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendGridMail = require("@sendgrid/mail");
const JWT_SECRET = "grubit";
const STRIPE_PUBLISHABLE_KEY =
  "";
const STRIPE_SECRET_KEY =
  "";

const stripe = require("stripe")(STRIPE_SECRET_KEY);


//no of salt rounds for bcrypt
const saltRounds = 10;
const SG_APIKEY =
  "";

module.exports = function (app) {
  //define server routes (endpoints)

  app.get("/api/loginPage", function (req, res) {
    res.json({ message: "Sample Login Page" });
  });

  //get all users
  app.get("/api/getAll", function (req, res) {
    User.find(function (err, samples) {
      if (err) res.json({ status: "error", error: err });
      console.log("samples", samples);
      res.json({ status: "ok", data: samples });
    });
  });

  //api to change phone number
  app.post("/api/changePhone", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);

      var query = { email: verify.email };

      var upd = { $set: { phone: req.body.phone } };
      User.updateOne(query, upd, function (err, dc) {
        if (err) res.json({ status: "error", error: err });
        else
          res.json({ status: "ok", data: "New Phone updated Successfully " });
      });
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to change address
  app.post("/api/address", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);

      var query = { email: verify.email };

      var upd = {
        $set: {
          streetName: req.body.streetName,
          apt: req.body.apt,
          buildingName: req.body.buildingName,
          zip: req.body.zip,
        },
      };
      User.updateOne(query, upd, function (err, dc) {
        if (err) res.json({ status: "error", error: err });
        else res.json({ status: "ok", data: "Address updated Successfully " });
      });
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to display names

  app.post("/api/displayName", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split(";");
    console.log(newT);
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);

      var query = { email: verify.email };

      //check if user with given email exists ot nor
      User.findOne(query, function (err, user) {
        if (err) {
          res.json({ status: "error", error: err });
        } else {
          console.log(user);
          res.json({ status: "ok", data: user });
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to display user info

  app.post("/api/display", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);

      var query = { email: verify.email };

      //check if user with given email exists ot nor
      User.findOne(query, function (err, user) {
        if (err) {
          res.json({ status: "error", error: err });
        } else {
          console.log(user);
          res.json({ status: "ok", data: user });
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api forgetpass route

  app.put('/api/forgotpass', function (req, res) {
    console.log(req.body);
    var query = { email: req.body.email };
    var regexEmail = /[a-z0-9]+@northeastern.edu/;
    // var regexPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*]).{8,}$/;
    //var regExName = /^[a-zA-Z]+$/;
    var em = req.body.email;
    // var pass = req.body.password;
    //var fname = req.body.full_name;

    if (!em.match(regexEmail)) {
        res.json({ status: "error", error: "Email is in invalid format, use northeastern.edu format" });
    }
    else {
        User.count(query, function (err, count) {
            if (err) {
                res.json({ status: "error", error: err });
            }
            if (count == 0) {
                res.json({ status: "error", error: "User does not exists!" });
            }
            else {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                var upd = { $set: { otp: OTP } };
                const body = 'Your OTP for forgot password is: ' + OTP;
                sendGridMail.setApiKey(SG_APIKEY);

                const msg = {
                    to: em,  
                    from: 'grubitapp@outlook.com', 
                    subject: 'OTP Verification',
                    text: body,
                    html: `<strong>${body}</strong>`,
                }

                User.updateOne(query, upd, function (err, dc) {
                    if (err)
                        res.json({ status: "error", error: err });
                    else {
                        sendGridMail
                            .send(msg)
                            .then((response) => {
                                console.log(response[0].statusCode)
                                console.log(response[0].headers)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                        res.json({ status: "ok", data: "Otp has been sent to the email ID" });
                    }
                });

            }
        });

    }
});


  //login route
  app.post("/api/login", function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    var regexEmail = /[a-z0-9]+@northeastern.edu/;
    var regexPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*]).{8,}$/;
    var loginEmail = req.body.email;
    var loginPwd = req.body.password;

    //check if email and password follows requirements
    if (!loginEmail.match(regexEmail)) {
      res.json({
        status: "error",
        error: "Email is in invalid format, use northeastern.edu format",
      });
    } else if (!loginPwd.match(regexPwd)) {
      res.json({
        status: "error",
        error:
          "Password is in invalid format, follow password rules : 1 Uppercase Character, 1 lower character, 1 special character, 1 digit and minimum 8 characters",
      });
    } else {
      var query = { email: req.body.email };
      //check if user with given email exists or not
      User.findOne(query, function (err, user) {
        if (err) {
          res.json({ status: "error", error: err });
        } else {
          console.log("User: " + user);
          //if user is returned not null, user exists
          if (user != null) {
            //compare password with saved password in DB
            bcrypt.compare(
              req.body.password,
              user.password,
              function (err, result) {
                console.log("Result: " + result);
                if (result) {
                  //generate token for user login
                  token = jwt.sign(
                    { email: loginEmail, name: user.name, type: "user" },
                    JWT_SECRET,
                    { expiresIn: "90d" }
                  );
                  let options = {
                    maxAge: 1000 * 60 * 60 * 24 * 90, // would expire after 90 days
                    httpOnly: false, // The cookie only accessible by the web server
                    //signed: true // Indicates if the cookie should be signed
                  };
                  res.cookie("token", token, options);
                  res.json({ status: "ok", data: token });
                } else {
                  res.json({
                    status: "error",
                    error: "Incorrect Password, try again!",
                  });
                }
              }
            );
          }
          //if user is returned null, user does not exists
          else {
            res.json({ status: "error", error: "User does not exists!" });
          }
        }
      });
    }
  });

  //signUp route
  app.post("/api/insert", function (req, res) {
    console.log(req.body);

    // var regExName = /^[a-zA-Z]+$/;
    var regExPhone =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    // var regexEmail = /[a-z0-9]+@northeastern.edu/;
    var regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var regExName = /(?![\s.]+$)/;

    var em = req.body.email;
    var pass = req.body.password;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var phone = req.body.phone;
    var query = { email: req.body.email };
    if (!fname.match(regExName)) {
      res.json({ status: "error", error: "Name is in invalid format" });
    } else if (!em.match(regexEmail)) {
      res.json({
        status: "error",
        error: "Email is in invalid format, use northeastern.edu format",
      });
    } else if (!phone.match(regExPhone)) {
      res.json({
        status: "error",
        error:
          "Phone is not in proper Format, please enter proper 10 digit phone number",
      });
    } else {
      User.count(query, function (err, count) {
        if (err) {
          res.json({ status: "error", error: err });
        }
        if (count == 1) {
          res.json({ status: "error", error: "Email Id Exists!" });
        } else {
          var record = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
          });
          record.save(function (err, rec) {
            if (err) {
              console.log("Saved " + rec);
              res.json({ status: "error", error: err });
            } else res.json({ status: "ok", data: "User Created Successfully" });
          });
        }
      });
    }
  });

  //validate OTP
  app.post("/api/validateOtp", function (req, res) {
    console.log(req.body);
    var query = { email: req.body.email };
    //var regExName = /^[a-zA-Z]+$/;
    var em = req.body.email;

    var ot = req.body.otp;
    //var fname = req.body.full_name;
    var query = { email: req.body.email, otp: req.body.otp };
    User.count(query, function (err, count) {
      if (err) {
        res.json({ status: "error", error: err });
      }
      if (count == 0) {
        res.json({ status: "error", error: "OTP Doesnt match" });
      } else {
        res.json({ status: "ok", data: "Otp has been verified successfully" });
      }
    });
  });

  //api to set new password

  app.put("/api/changePass", function (req, res) {
    console.log(req.body);
    //var query = { email: req.body.email };
    //var regExName = /^[a-zA-Z]+$/;
    var em = req.body.email;
    var pass = req.body.password;
    var regexPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*]).{8,}$/;
    //var fname = req.body.full_name;
    if (!pass.match(regexPwd)) {
      res.json({
        status: "error",
        error:
          "Password is in invalid format, follow password rules : 1 Uppercase Character, 1 lower character, 1 special character, 1 digit and minimum 8 characters",
      });
    } else {
      var query = { email: req.body.email, pass: req.body.password };
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          var upd = { $set: { password: hash } };
          User.updateOne(query, upd, function (err, dc) {
            if (err) res.json({ status: "error", error: err });
            else
              res.json({
                status: "ok",
                data: "New Password updated Please sign in ",
              });
          });
        });
      });
    }
  });

  //api to fetch restaurants
  app.post("/api/fetchRestaurant", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        Res.find(function (err, samples) {
          if (err) res.json({ status: "error", error: err });
          console.log("samples", samples);
          res.json({ status: "ok", data: samples });
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to fetch clubs
  app.post("/api/fetchClubs", function (req, res) {
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        Club.find(function (err, samples) {
          if (err) res.json({ status: "error", error: err });
          console.log("samples", samples);
          res.json({ status: "ok", data: samples });
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to fetch menu based on id
  app.post("/api/fetchMenu", function (req, res) {
    var token = req.headers.cookie;
    console.log(req.body);
    var id = req.body.id;
    var query = { restaurantID: id };
    console.log(id);
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        Menu.find(query, function (err, menu) {
          if (err) {
            res.json({ status: "error", error: err });
          } else {
            console.log(menu);
            res.json({ status: "ok", data: menu });
          }
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to fetch reviews
  app.post("/api/fetchReviews", function (req, res) {
    console.log(req);
    var token = req.headers.cookie;
    console.log(req.body);
    var id = req.body.id;
    var query = { restaurantID: id };
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        Review.find(function (err, review) {
          if (err) {
            res.json({ status: "error", error: err });
          } else {
            console.log(review);
            res.json({ status: "ok", data: review });
          }
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api to fetch best selling
  app.post("/api/fetchBestSelling", function (req, res) {
    console.log(req);
    var token = req.headers.cookie;
    console.log(req.body);
    var id = req.body.id;
    var query = { restaurantID: id, bestSelling: "yes" };
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        Menu.find(query, function (err, review) {
          if (err) {
            res.json({ status: "error", error: err });
          } else {
            console.log(review);
            res.json({ status: "ok", data: review });
          }
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  app.post("/api/profile", function (req, res) {
    console.log(req.headers.authorization);
    //verify token
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log(actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        res.json({
          status: "ok",
          message: "Welcome to Profile page!" + verify.email,
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  //api for stripe api payment method
  app.post("/api/create-checkout-session", async function (req, res) {
    console.log(req.body);
    //verify token
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("INSIDE STRIPE" + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        const total = req.body.stripeTotal;
        const quantity = req.body.stripeQty;
        const perItem = Math.floor(total / quantity);
        console.log((total));
        console.log((quantity));
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Order",
                },
                unit_amount: perItem * 100,
              },
              quantity: quantity,
            },
          ],
          mode: "payment",
          success_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
        });
        console.log(session.id);
        res.json({ id: session.id });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });

  app.post("/api/booking", function (req, res) {
    console.log(req.body);
    var regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var regExName = /(?![\s.]+$)/;
    var regExPhone =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var time = req.body.time;
    var tableSize = req.body.tableSize;
    var date = req.body.date;
    var message = req.body.message;

    // var address = req.body.address;
    var query = { email: req.body.email };
    if (!name.match(regExName)) {
      res.json({ status: "error", error: "Name is in invalid format" });
    } else if (!email.match(regexEmail)) {
      res.json({ status: "error", error: "Email is in invalid format" });
    } else if (!phone.match(regExPhone)) {
      res.json({
        status: "error",
        error:
          "Phone is not in proper Format, please enter proper 10 digit phone number",
      });
    } else {
      var record = new ClubBooking({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        time: req.body.time,
        tableSize: req.body.tableSize,
        date: req.body.date,
        message: req.body.message,
      });
      record.save(function (err, rec) {
        if (err) {
          console.log("Saved " + rec);
          res.json({ status: "error", error: err });
        } else res.json({ status: "ok", data: "Club Booking Successful" });
      });
    }
  });


  //api for orderHistory
  app.post("/api/orderHistory", function (req, res) {
    console.log(req.body);
    var fname = req.body.fname;
    var lname = req.body.lname;

    var emailId = req.body.emailId;
    var restaurantName = req.body.restaurantName;
    var productItem = req.body.productItem;
    var total = req.body.total;
    // var address = req.body.address;
    var query = { email: req.body.email };
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log(actualToken);
    const verify = jwt.verify(actualToken, JWT_SECRET);
    console.log(verify);
    if (verify.type === "user") {
      var record = new OrderHistory({
        fname: req.body.fname,
        lname: req.body.lname,
        emailId: req.body.emailId,
        productItem: req.body.productItem,
        restaurantName: req.body.restaurantName,
        total: req.body.total
      });
      record.save(function (err, rec) {
        if (err) {
          console.log("Saved " + rec);
          res.json({ status: "error", error: err });
        } else res.json({ status: "ok", data: "Order Placed Successfully" });
      });

    } else {
      res.json({ status: "error", message: "Invalid User/Token" });
    }

  });

  //api to fetch best orderHistory
  app.post("/api/fetchOrderHistory", function (req, res) {
    console.log(req);
    var token = req.headers.cookie;
    console.log(req.body);

    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);
      if (verify.type === "user") {
        var query = { emailId: verify.email };
        console.log(query);
        OrderHistory.find(query, function (err, review) {
          if (err) {
            console.log(err);
            res.json({ status: "error", error: err });
          } else {
            console.log(review);
            res.json({ status: "ok", data: review });
          }
        });
      } else {
        res.json({ status: "error", message: "Invalid User/Token" });
      }
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }
  });


  //api for order success
  app.post("/api/newOrder", function (req, res) {
    console.log(req.body);

    var emailId = req.body.emailId;
    var resName = req.body.resName;

    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log(actualToken);
    const verify = jwt.verify(actualToken, JWT_SECRET);
    console.log(verify);
    if (verify.type === "user") {
      var query = { email: verify.email };
      User.findOne(query, function (err, user) {
        if (err) {
          res.json({ status: "error", error: err });
        } else {
          var error = "";
          console.log(user);
          var fname = req.body.fname;
          var lname = req.body.lname;
          console.log(fname + lname);
          for (var ct in req.body.localCart) {

            var record = new OrderHistory({
              fname: fname,
              lname: lname,
              emailId: verify.email,
              productName: req.body.localCart[ct].name,
              productItem: req.body.localCart[ct].qty,
              restaurantName: req.body.resName,
              total: req.body.localCart[ct].price
            });
            console.log(record);
            record.save(function (err, rec) {
              if (err) {
                console.log("Saved " + rec);
                error = err;
              }
            });
            console.log(ct + ": " + req.body.localCart[ct].name);
          }
          res.json({ status: "ok", message: "Order placed successfully" });
        }

      });
    } else {
      res.json({ status: "error", message: "Invalid User/Token" });
    }

  });

  //api to delete user 
  app.delete('/api/deleteUser', function (req, res) {
    // console.log(req.body);
    var token = req.headers.cookie;
    var newT = token.split("=");
    var actualToken = newT[1];
    console.log("Actual Token : " + actualToken);
    try {
      const verify = jwt.verify(actualToken, JWT_SECRET);
      console.log(verify);

      var query = { email: verify.email };
      console.log(query);
      User.delete(query, function (err, user) {
        if (err) {
          console.log(err);
          res.json({ status: "error", error: err });

        } else {
          console.log(user);
          res.json({ status: "ok", data: "User deleted successfully" });
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error), "error");
      res.json({ status: "error", message: error });
    }

  });

  //get all orders
  app.get("/api/getAllOrders", function (req, res) {
    OrderHistory.find(function (err, samples) {
      if (err) res.json({ status: "error", error: err });
      console.log("samples", samples);
      res.json({ status: "ok", data: samples });
    });
  });


  //get all bookings
  app.get("/api/getAllBooking", function (req, res) {
    ClubBooking.find(function (err, samples) {
      if (err) res.json({ status: "error", error: err });
      console.log("samples", samples);
      res.json({ status: "ok", data: samples });
    });
  });
};

