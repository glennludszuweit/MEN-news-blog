/* eslint-disable */
/////ALERTS/////
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="text-center alert alert-${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

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
      showAlert('success', 'Registered in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};

const registerForm = document.querySelector('.form-signup');
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
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('danger', error.response.data.message);
  }
};

const loginForm = document.querySelector('.form-signin');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const signinEmail = document.getElementById('signinEmail').value;
    const signinPassword = document.getElementById('signinPassword').value;
    login(signinEmail, signinPassword);
  });
}

/////UPDATE USER DATA/////
const updateUserData = async (updateUserName, updateUserEmail) => {
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

const updateUserDataForm = document.querySelector('.update-user-data');
if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updateUserName = document.getElementById('updateUserName').value;
    const updateUserEmail = document.getElementById('updateUserEmail').value;
    updateUserData(updateUserName, updateUserEmail);
  });
}

/////UPDATE USER PASSWORD/////
const updateUserPassword = async (currentPass, newPass, confirmNewPass) => {
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

const updateUserPasswordForm = document.querySelector('.update-user-password');
if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmNewPass = document.getElementById('confirmNewPass').value;
    updateUserPassword(currentPass, newPass, confirmNewPass);
  });
}

/////COMMENT/////
const comment = async (user, post, comment) => {
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

const commentForm = document.querySelector('.comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentUserId = document.getElementById('commentUserId').value;
    const commentPostId = document.getElementById('commentPostId').value;
    const commentMessage = document.getElementById('comment-message').value;
    comment(commentUserId, commentPostId, commentMessage);
  });
}
