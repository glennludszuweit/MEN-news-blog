/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
/////UPDATE USER DATA/////
export const updateUserData = async (updateUserName, updateUserEmail) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:4000/api/v1/users/updateProfile',
      data: {
        name: updateUserName,
        email: updateUserEmail,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/account');
      }, 2000);
      showAlert('success', 'Credentials updated!');
    }
  } catch (error) {
    console.log(error);
    showAlert('danger', error.response.data.message);
  }
};

/////UPDATE USER PASSWORD/////
export const updateUserPassword = async (
  currentPass,
  newPass,
  confirmNewPass
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:4000/api/v1/users/updateMyPassword',
      data: {
        currentPassword: currentPass,
        password: newPass,
        confirmPassword: confirmNewPass,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/account');
      }, 2000);
      showAlert('success', 'Password updated!');
    }
  } catch (error) {
    console.log(error);
    showAlert('danger', error.response.data.message);
  }
};
