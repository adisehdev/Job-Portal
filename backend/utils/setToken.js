export const setToken = (user, statusCode, res, message) => {
  const token = user.createToken(); //jwt sign method is called

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
      secure: true,
      sameSite: "None",
    })
    .json({
      //setting token inside cookies
      success: true,
      user,
      message,
      token,
    });
};
