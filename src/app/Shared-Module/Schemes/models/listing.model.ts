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
  assignedTeamID:string;
}

export class updateEmployeeParams {
  id!: number;
  name!: string;
  userId!: string;
  email!: string;
  password!: string;
  phone!: string;
  salary!: number;
  assignedTeamID!: string;
  isAdmin:boolean = false;
  isTeamLead:boolean = false;
  isUser:boolean = false;
  userAuthDetails:{
    isAdmin: boolean;
    isTeamLead: boolean;
    isUser: boolean;
  } = {
    isAdmin: false,
    isTeamLead: false,
    isUser: false,
  }
}
