const shortid = require('shortid');

const validID = (req, res, next) => {
  if (req.params.shortId && shortid.isValid(req.params.shortId)) {
    return next();
  }
  return res.send('error').status(400);
};

export default validID;
