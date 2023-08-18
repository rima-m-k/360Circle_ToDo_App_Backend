const USER = require('../model/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const { sendOTP } = require('../utils/nodemailer');

async function login(req, res) {
   try {

      const user = await USER.findOne({ email: req.body.email })
      if (user) {
         const checkPassword = await bcrypt.compare(
            req.body.password,
            user.password
         );
         if (checkPassword) {
            req.session.userID = user._id
            res.json({
               user: user.email,
               success: true
            });

         } else {
            res.status(401).send({ message: "Invalid Password" });

         }

      } else {
         res.status(401).send({ message: "Invalid Email" });

      }

   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }

}
async function signup(req, res) {
   try {
      let checkUser = await USER.findOne({ email: req.body.email })
      if (checkUser) {
         res.status(401).send({ message: "Email already taken" });
      } else {
         if (req.body.password !== req.body.cpassword) {
            res.status(401).send({ message: "Passwords must be same" });

         } else {
            let newUser = new USER({
               fullName: req.body.fullName,
               email: req.body.email,
               password: await bcrypt.hash(req.body.password, 10),
            })
            let user = await newUser.save()
            req.session.userID = user._id
            res.json({ user: user.email, succes: true })

         }

      }


   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }

}
async function addTodo(req, res) {
   try {

      let user = await USER.updateOne({ email: req.User }, {
         $push: {
            tasks: {
               taskName: req.body.todo,
               creationDate: Date.now(),
               isComplete: false
            }

         }
      })
      if (user.modifiedCount > 0) res.json({ succes: true, message: "Task added successfully" })
      else res.status(401).send({ message: "Unable to add task" });

   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }
}

async function fetchTodo(req, res) {
   try {
      let allTasks = await USER.findOne({ email: req.User }, { tasks: 1, _id: 0 })
      res.json(allTasks)
   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }
}

async function removeTodo(req, res) {
   try {
      await USER.updateOne({ email: req.User }, {
         $pull: { tasks: { _id: req.params.id } }
      })
      res.json({ succes: true })

   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }
}

async function updateTodo(req, res) {
   try {
      await USER.updateOne({ email: req.User, "tasks._id": req.body.taskID }, {
         $set: {
            "tasks.$.isComplete": true
         }

      })
      res.json({ succes: true })

   } catch (error) {
      res.status(500).send({ message: "Server error" });

   }
}
let OTP, EMAIL
async function sendEmail(req, res) {
   try {
      console.log(req.body)
      let checkEmail = await USER.findOne({ email: req.body.email })
      if (checkEmail) {
         OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

         sendOTP(OTP, req.body.email)
         EMAIL = req.body.email
         res.json({ succes: true })
      }
      else {
         res.status(404).send({ message: "Email not found.Try logging in" });
      }
   } catch (error) {
      res.status(500).send({ message: "server Error" });
   }
}
async function checkOTP(req, res) {
   try {
      if (req.body.otp === OTP) {
         res.json({ succes: true })
      } else {
         res.status(404).send({ message: "Incorrect Otp" });
      }
   } catch (error) {
      res.status(500).send({ message: "Server Error" });
   }
}

async function changePassword(req, res) {
   try {
      if (req.body.password === req.body.cPassword) {
         await USER.updateOne({ email: EMAIL }, {
            $set: {
               password: await bcrypt.hash(req.body.password, 10),
            }
         })
         res.json({ succes: true })
      } else {
         res.status(404).send({ message: "Passwords must be same" });

      }



   } catch (error) {
      res.status(500).send({ message: "Server Error" });
   }
}
module.exports = {
   login,
   signup,
   addTodo,
   fetchTodo,
   removeTodo,
   updateTodo,
   sendEmail,
   checkOTP,
   changePassword
} 
