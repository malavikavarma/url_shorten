const jwt = require('jsonwebtoken');

const cookieValidation = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, 'secertkey');
    req.user_id = decoded.user_id;
    // console.log('user id in cookie', req.user_id);
    next();
  } catch (err) {
    res.status(400).send('Not logged in. Please Login using your Facebook ID');
  }
};

export default cookieValidation;
