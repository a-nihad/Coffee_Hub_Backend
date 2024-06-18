export const catchAsync = (callBack_function) => {
  return (req, res, next) => {
    callBack_function(req, res, next).catch(next);
  };
};
