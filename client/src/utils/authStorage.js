export const saveRememberedCredentials = (email, password) => {
  localStorage.setItem('rememberEmail', email);
  localStorage.setItem('rememberPassword', password);
};

export const clearRememberedCredentials = () => {
  localStorage.removeItem('rememberEmail');
  localStorage.removeItem('rememberPassword');
};

export const getRememberedCredentials = () => ({
  email: localStorage.getItem('rememberEmail') || '',
  password: localStorage.getItem('rememberPassword') || '',
});

export const clearTokenDueLogOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};
