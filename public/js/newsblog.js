/* eslint-disable */
/////ALERTS/////
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert-${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

/////LOGIN/////
const login = async (signinEmail, signinPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/users/login',
      data: {
        email: signinEmail,
        password: signinPassword,
      },
    });
    if (res.data.status === 'success') {
      location.assign('/');
      showAlert('success', 'Logged in successfully!');
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
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
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        // alert('Logged in successfully');
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    alert(error.response.data.message);
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
