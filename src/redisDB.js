const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('redis connected'); // eslint-disable-line
});
client.on('error', () => {
  console.log('redis error occured'); // eslint-disable-line
});
const redisDB = (req, res, next) => {
  client.get(req.params.shortId, (err, value) => {
    if (err || value === null) return next();
    return res.redirect(value);
  });
};

module.exports = {
  client,
  redisDB,
};
