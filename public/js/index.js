/* eslint-disable */
import '@babel/polyfill';
import { login } from './auth';
import { register } from './auth';
import { updateUserData } from './updateUser';
import { updateUserPassword } from './updateUser';
import { comment } from './comments';

//DOM elements
const registerForm = document.querySelector('.form-signup');
const loginForm = document.querySelector('.form-signin');
const updateUserDataForm = document.querySelector('.update-user-data');
const updateUserPasswordForm = document.querySelector('.update-user-password');
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
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updateUserName = document.getElementById('updateUserName').value;
    const updateUserEmail = document.getElementById('updateUserEmail').value;
    updateUserData(updateUserName, updateUserEmail);
  });
}

if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmNewPass = document.getElementById('confirmNewPass').value;
    updateUserPassword(currentPass, newPass, confirmNewPass);
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
