import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import  ErrorHandler  from "../middlewares/error.js";
import { setToken } from "../utils/setToken.js";

//functionality to register new user
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    //if any of the fields missing
    return next(new ErrorHandler("Fill complete details"));
  }

  const isEmail = await User.findOne({ email }); //check if user with email already exist

  if (isEmail) return next(new ErrorHandler("User already exists"));

  const user = new User({
    name,
    email,
    phone,
    password,
    role,
  });

  await user.save()

  setToken(user, 201, res, "Successfully registered");
});

//functionality to login user
export const loginUser = catchAsyncError(async (req, res, next) => {
  const {email, password, role } = req.body;

  if (!email || !password || !role)
    return next(new ErrorHandler("Enter all details to login"));
  const user = await User.findOne({ email }).select("+password"); //to allow password to come in user obj
  if (!user) return next(new ErrorHandler("Invalid email or password", 401));
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid email or password", 401)); //pw mismatch case
  if (user.role !== role)
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    ); //role mismatch case
  setToken(user, 201, res, "Logged in successfully");
});

//functionality to logout user
export const logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now()),
    })
    .json({
      message: "Logged out successfully",
      success: true,
    });
});

//functionality to get user --> doubtfull
export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
