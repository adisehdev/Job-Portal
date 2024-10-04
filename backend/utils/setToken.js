export const setToken = (user,statusCode,res,message)=>{
    
    const token = user.createToken() //jwt sign method is called 
    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Set httpOnly to true
        secure : true,
      }
      
      
      res.status(statusCode).cookie("token", token, options).json({ //setting token inside cookies
        success: true,
        user,
        message,
        token,
      });


}