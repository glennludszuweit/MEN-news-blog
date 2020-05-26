/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
/////UPDATE USER DATA/////
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateProfile';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUppercase()}Credentials updated!`);
    }
  } catch (error) {
    console.log(error);
    showAlert('danger', error.response.data.message);
  }
};
