const handleSuccess = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data: data || '',
  });
};

const handleError = (res, message, statusCode = 500) => {
  if (Array.isArray(message)) {
    res.status(statusCode).json({
      status: 'error',
      messages: message || 'Internal Server Error',
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      message: message || 'Internal Server Error',
    });
  }
};

module.exports = {
  handleSuccess,
  handleError,
};
