const onClickGetURL = () => {
  const originalURL = document.getElementById('txtareaURL').value;
  axios
    .get(`http://localhost:5000/generateShortID?text=${originalURL}`)
    .then((response) => {
      document.getElementById('txtareaURL').value = `http://localhost:5000/${response.data}`;
    })
    .catch((error) => {
      document.getElementById('divTable').innerHTML = error.response.data;
    });
};
const tableGeneration = () => {
  axios
    .get('http://localhost:5000/tablegenerate')
    .then((response) => {
      document.getElementById('divTable').innerHTML = response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const FBLogin = () => {
  FB.login(
    (response) => {
      axios
        .get(`http://localhost:5000/usertoken?token=${response.authResponse.accessToken}`)
        .then((response) => {
          const exipry = ';max-age = 604800 ';
          document.cookie = `token=${response.data}${exipry}`;
          tableGeneration();
        });
    },
    { scope: 'email' },
  );
};

const FBLogout = () => {
  const d = new Date();
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
  const expires = `expires=${d.toGMTString()}`;
  document.cookie = `${'token=;'}${expires}`;
};

const loggedIn = document.cookie.indexOf('token');
if (loggedIn > -1) {
  document.getElementById('btnFbLogin').style.display = 'none';
  tableGeneration();
} else {
  document.getElementById('btnFbLogout').style.display = 'none';
}
