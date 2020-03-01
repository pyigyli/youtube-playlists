export const rememberLogin = (username) => {
  localStorage.setItem('ytp-username', username)
}

export const tryAutoLogin = (setUser) => {
  const username = localStorage.getItem('ytp-username')
  if (username) {
    setUser({
      type: 'AUTOLOGIN',
      username
    })
  }
}

export const isAutoLoginSet = () => {
  return localStorage.getItem('ytp-username')
}

export const forgetLogin = () => {
  localStorage.removeItem('ytp-username')
}
