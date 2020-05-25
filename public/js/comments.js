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

export const updateComment = async (comment) => {
  try {
    let id = document.getElementById('updateCommentId').value;
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:4000/api/v1/comments/${id}`,
      data: { comment },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/my-comments');
      }, 2000);
      showAlert('success', 'Comment Updated!');
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
