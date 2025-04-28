export interface UserDtoBrief {
  id: string;
  identity: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  isActive: boolean;
  employmentNumber: string;
  fullName: string;
  committeeId: string;
  lastLoginDateTime: string;
  jobTitle?: string | null;
  rankId?: number | null;
  groups: { id: string; name: string }[];
}
