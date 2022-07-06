/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValidUser {
  public username = 'validUsername';
  public email = 'validEmail@gmail.com';
  public password = '123456';
}

const validUser = new ValidUser();

// Invalid username

export class UserWithEmptyUsername {
  public username = '';
  public email = validUser.email;
  public password = validUser.password;
}

export class UserWithInvalidUsernameType {
  public username: any = true;
  public email = validUser.email;
  public password = validUser.password;
}

// Invalid email

export class UserWithEmptyEmail {
  public username = validUser.username;
  public email = '';
  public password = validUser.password;
}

export class UserWithEmptyEmailLocal {
  public username = validUser.username;
  public email = '@gmail.com';
  public password = validUser.password;
}

export class UserWithSizeEmailLocalLongerThanAllowed {
  public username = validUser.username;
  public email =
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com';
  public password = validUser.password;
}

export class UserWithEmptyEmailDomain {
  public username = validUser.username;
  public email = 'invalidEmail@';
  public password = validUser.password;
}

export class UserWithSizeEmailDomainLongerThanAllowed {
  public username = validUser.username;
  public email =
    'invalidEmail@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  public password = validUser.password;
}

export class UserWithInvalidEmailType {
  public username = validUser.username;
  public email: any = true;
  public password = validUser.password;
}

// Invalid password

export class UserWithEmptyPassword {
  public username = validUser.username;
  public email = validUser.email;
  public password = '';
}

export class UserWithInvalidPasswordType {
  public username = validUser.username;
  public email = validUser.email;
  public password: any = true;
}
