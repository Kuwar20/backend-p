class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Something went wrong';
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default ErrorHandler;