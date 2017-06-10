module.exports = (req, res, next) => {
  res.error = (code, errors) => {
    res.status(code);
    res.json({ meta: { code, errors } });
  };

  res.success = payload => res.json({ payload });

  next();
};
