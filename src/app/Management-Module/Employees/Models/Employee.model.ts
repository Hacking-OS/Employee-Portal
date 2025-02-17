export interface Employee {
   Id?:number;
    userId: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    salary: number;
    isAdmin: boolean;
    isTeamAdmin: boolean;
    isUser: boolean;
    refreshToken: string;
    assignedTeamID: string;
    refreshTokenExpirationDate: string;

    userAuthDetails:{
      isAdmin: boolean;
      isTeamLead: boolean;
      isUser: boolean;
    }
  }
  