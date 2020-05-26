/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
/////REGISTER/////
export const register = async (
  signupName,
  signupEmail,
  signupPassword,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        confirmPassword: confirmPassword,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Registered in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};

/////LOGIN/////
export const login = async (signinEmail, signinPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email: signinEmail,
        password: signinPassword,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
