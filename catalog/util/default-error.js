const defaultError = err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  return err;
};

module.exports = defaultError;