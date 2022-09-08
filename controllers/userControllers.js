const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const { emailValidation } = require("../utils/emailValidation");
const { generateToken } = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const isEmailValid = emailValidation(email);
  const isPasswordValid = password.length > 5;

  if (isEmailValid && isPasswordValid) {
    const isUsernameExists = await User.findOne({ username: username });
    if (isUsernameExists) {
      res.status(400);
      throw new Error("Username Not Available");
    } else {
      const isEmailExists = await User.findOne({ email: email });
      if (isEmailExists) {
        res.status(400);
        throw new Error("Email Already Exists");
      } else {
        const createUser = new User(req.body);
        const newUser = await createUser.save();
        const user = {
          username : newUser.name , 
          email : newUser.email , 
          isAdmin : newUser.isAdmin 
        }
        return res.status(200).json({
          user,
          message: "user created successfully",
        });
      }
    }
  } else {
    if (isEmailValid === false) {
      res.status(400);
      throw new Error("Please Enter Valid Email");
    }
    if (isPasswordValid === false) {
      res.status(400);
      throw new Error("Please Enter A Password more then 5 charactures");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email , password } = req.body;
  const isPasswordValid = password.length > 5;
  if (isPasswordValid) {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        userExists.password
      );
      if (isPasswordMatched) {
        const userInfo = {
          _id: userExists._id,
          username: userExists.username,
          email: userExists.email,
          token: generateToken(userExists._id),
          isAdmin : userExists.isAdmin  , 
        };
        return res.status(200).json({
          userInfo: userInfo,
          message: "user logged in successfull",
        });
      } else {
        res.status(400);
        throw new Error("password does not matched!");
      }
    } else {
      res.status(400);
      throw new Error("User does not exists with this email");
    }
  } else {
    res.status(400);
    throw new Error("Please Enter A Password more then 5 charactures");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("No User Found");
  } else {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message : "user logged in", 
      isAdmin : user.isAdmin , 
      isPaid : user.isPaid
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.status(400);
    throw new Error("Something Went Wrong!!");
  } else {
    return res.status(200).json({
      users : users , 
      message : 'users loaded sucessfully'
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  
  if (!user) {
    res.status(400);
    throw new Error("No User Found");
  } else {
    const users = await User.find({})
    return res.status(200).json({
      users : users , 
      message : 'user deleted sucessfully'
    });
  }
});



module.exports = { registerUser, loginUser, currentUser , allUsers ,  deleteUser};