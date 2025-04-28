export interface UpdateUserDto {
  id: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userName: string;
  isActive: boolean;
  committeeId: string | null;
  jobTitle: string | null;
  rankId: number | null;
}
