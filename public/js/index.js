/* eslint-disable */
import '@babel/polyfill';
import { login } from './auth';
import { register } from './auth';
import { updateSettings } from './updateSettings';
import { comment } from './comments';
import { newPost } from './post';

//DOM elements
const registerForm = document.querySelector('.form-signup');
const loginForm = document.querySelector('.form-signin');
const updateUserDataForm = document.querySelector('.update-user-data');
const updateUserPasswordForm = document.querySelector('.update-user-password');
const createNewPostForm = document.querySelector('.create-new-post');
const commentForm = document.querySelector('.comment-form');

//DELEGATION
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const signupName = document.getElementById('signupName').value;
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    register(signupName, signupEmail, signupPassword, confirmPassword);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const signinEmail = document.getElementById('signinEmail').value;
    const signinPassword = document.getElementById('signinPassword').value;
    login(signinEmail, signinPassword);
  });
}

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('updateUserName').value);
    form.append('email', document.getElementById('updateUserEmail').value);
    form.append(
      'profileImg',
      document.getElementById('updateUserPhoto').files[0]
    );
    console.log(form);
    await updateSettings(form, 'data');
  });
}

if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPass').value;
    const password = document.getElementById('newPass').value;
    const confirmPassword = document.getElementById('confirmNewPass').value;
    await updateSettings(
      { currentPassword, password, confirmPassword },
      'password'
    );

    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmNewPass').value = '';
  });
}

if (createNewPostForm) {
  createNewPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      'coverImage',
      document.getElementById('postCoverImage').files[0]
    );
    form.append('title', document.getElementById('postTitle').value);
    form.append('author', document.getElementById('postAuthor').value);
    form.append('category', document.getElementById('postCategory').value);
    form.append(
      'description',
      document.getElementById('postDescription').value
    );
    form.append(
      'introduction',
      document.getElementById('postIntroduction').value
    );
    form.append('content', document.getElementById('postContent').value);
    console.log(form);
    newPost(form);
  });
}

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentUserId = document.getElementById('commentUserId').value;
    const commentPostId = document.getElementById('commentPostId').value;
    const commentMessage = document.getElementById('comment-message').value;
    comment(commentUserId, commentPostId, commentMessage);
  });
}
