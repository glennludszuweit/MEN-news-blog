/* eslint-disable */

/////LOGIN/////
const login = async (signinEmail, signinPassword) => {
  console.log(signinEmail, signinPassword);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/login',
      data: {
        email: signinEmail,
        password: signinPassword,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector('.form-signin').addEventListener('submit', (e) => {
  e.preventDefault();
  const signinEmail = document.getElementById('signinEmail').value;
  const signinPassword = document.getElementById('signinPassword').value;
  login(signinEmail, signinPassword);
});

/////REGISTER/////
const register = async (
  signupName,
  signupEmail,
  signupPassword,
  confirmPassword
) => {
  console.log(signinEmail, signinPassword);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/signup',
      data: {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        confirmPassword: confirmPassword,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector('.form-signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const signupName = document.getElementById('signupName').value;
  const signupEmail = document.getElementById('signupEmail').value;
  const signupPassword = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  register(signupName, signupEmail, signupPassword, confirmPassword);
});
