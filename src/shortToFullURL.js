import DB from './sequelize/models/index';
import { client } from './redisDB';

const shorttoFullURL = (req, res) => {
  DB.urls
    .findById(req.params.shortId)
    .then(({ fullurl }) => {
      client.set(req.params.shortId, fullurl);
      return res.redirect(fullurl);
    })
    .catch(error => res.send(error.message).status(400));
};
export default shorttoFullURL;
