const notFound=(req,res,next)=>{
    const error=new Error(`Not Found- ${req.originalUrl}`);
    res.status(404);
    next(error);
};
// errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
    });
};

module.exports = { notFound, errorHandler };