/**
 * Register object, pass to user register action
 */
export class RegisterDto {
  public username   = '';
  public password   = '';
  public confirmPassword   = '';
  public firstname  = '';
  public lastname	  = '';
  public email      = '';

  constructor(  username?: string,
                password?: string,
                confirmPassword?: string,
                firstname?: string,
                lastname?: string,
                email?: string) {
    if (typeof (username) === 'string') {
      this.username = username;
    }
    if (typeof (password) === 'string') {
      this.password = password;
    }
    if (typeof (confirmPassword) === 'string') {
      this.confirmPassword = confirmPassword;
    }
    if (typeof (firstname) === 'string') {
      this.firstname = firstname;
    }
    if (typeof (lastname) === 'string') {
      this.lastname = lastname;
    }
    if (typeof (email) === 'string') {
      this.email = email;
    }
  }
}