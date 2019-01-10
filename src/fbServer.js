import DB from './sequelize/models/index';

const axios = require('axios');
const jwt = require('jsonwebtoken');

const fbServerConnection = (req, res) => {
  axios
    .get(
      `https://graph.facebook.com/me?fields=id,first_name,last_name,picture{url},email&access_token=${
        req.query.token
      }`,
    )
    .then((result) => {
      // console.log(result.data.picture.data.url);
      DB.users.findOrCreate({
        where: {
          id: result.data.id,
          firstname: result.data.first_name,
          lastname: result.data.last_name,
          picurl: result.data.picture.data.url,
          emailid: result.data.email,
        },
      });

      const token = jwt.sign({ user_id: result.data.id }, 'secertkey');
      return res.send(token);
    })
    .catch(error => error.message);
};
export default fbServerConnection;
