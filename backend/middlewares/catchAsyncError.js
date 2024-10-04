export const catchAsyncError = (theFunc)=>{
    return (req,res,next)=>{
        theFunc(req,res,next).catch((err)=>next(err))
    }
}