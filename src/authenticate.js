export const login = async (notion) => {
  return notion.login({
    email: process.env.DEVICE_USERNAME,
    password: process.env.DEVICE_PASSWORD,
  }).catch((error) => {
    console.log('Error logging in: ', error);
  });
}

export const logout = async (notion) => {
  notion
    .logout()
    .catch((error) => {
      console.log('Error logging out: ', error);
    });

  console.log('Logout successful');
}