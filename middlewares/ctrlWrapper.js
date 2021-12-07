const ctrlWrapper = (cntrlr) => {
  return async (res, req, next) => {
    try {
      await cntrlr(res, req, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
