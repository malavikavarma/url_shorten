import DB from './sequelize/models/index';

const shortid = require('shortid');

const generateShortID = (req, res) => {
  const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
  if (!req.query.text) {
    res.status(400).send('URL not found');
  } else if (!urlRegExp.test(req.query.text)) {
    res.status(400).send('Incorrect URL');
  } else {
    DB.urls
      .findAll({ where: { fullurl: req.query.text } })
      .then((result) => {
        if (result.length) {
          return res.send(result[0].id);
        }
        const id = shortid.generate();
        DB.urls.create({
          id,
          fullurl: req.query.text,
          countclicks: 0,
          userid: req.user_id,
        });
        return res.send(id);
      })
      .catch(err => err);
  }
};

export default generateShortID;
