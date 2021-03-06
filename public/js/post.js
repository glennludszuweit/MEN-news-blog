/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const newPost = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Post created successfully!');
      window.setTimeout(() => {
        location.assign('/my-posts');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};

export const updatePost = async (data) => {
  try {
    let id = document.getElementById('updatePostId').value;
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/posts/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Post updated successfully!');
      window.setTimeout(() => {
        location.assign('/my-posts');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};
