const errorHandler = (error, req, res, next) =>  {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data || null;
  res.status(statusCode).json({ 
    message,
    statusCode,
    data
  });
};

module.exports = errorHandler;
