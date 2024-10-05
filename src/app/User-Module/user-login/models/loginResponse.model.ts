export interface LoginResponse {
  employee:Employee;
  accessToken:string;
  refreshToken:string;
}

interface Employee{
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
