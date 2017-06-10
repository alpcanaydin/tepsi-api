module.exports = errors =>
  errors.map(err => ({
    field: err.param,
    message: err.msg,
  }));
