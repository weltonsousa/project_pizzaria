interface User {
  name: string;
  email: string;
  password: string;
}
//export default User;

interface AuthUser {
  email: string;
  password: string;
}

export { User, AuthUser };