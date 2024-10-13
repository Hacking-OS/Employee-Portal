export interface gridListingParams {
  id: number;
  userId: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  salary: number;
  isAdmin: boolean;
  isTeamAdmin: boolean;
  isUser: boolean;
  teamName:string;
}

export class updateEmployeeParams {
  id!: number;
  name!: string;
  userId!: string;
  email!: string;
  password!: string;
  phone!: string;
  salary!: number;
}
