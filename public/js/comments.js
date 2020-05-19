/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
/////COMMENT/////
export const comment = async (user, post, comment) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/v1/comments',
      data: {
        user,
        post,
        comment,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
      showAlert('success', 'Comment Added!');
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
