export interface gridListingParams {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  salary: number;
  isAdmin: boolean;
  isTeamAdmin: boolean;
  isUser: boolean;
}

export class updateEmployeeParams {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  phone!: string;
  salary!: number;
}
