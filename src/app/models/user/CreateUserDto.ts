export interface CreateUserDto {
  username: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  employmentNumber: string;
  password: string;
  confirmPassword: string;
  committeeId: string | null;
}
