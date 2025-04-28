export class UserInActiveDirectoryDto {
  name: string = '';
  email: string = '';
  userName: string = '';

  constructor(name: string, email: string, userName: string) {
    this.name = name;
    this.email = email;
    this.userName = userName;
  }
}
