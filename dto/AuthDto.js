class AuthDto {
  constructor(email, password) {
    this._email = email;
    this._password = password;
  }

  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set password(password) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  toObject() {
    return {
      email: this._email,
      password: this._password,
    };
  }
}

export default AuthDto;
