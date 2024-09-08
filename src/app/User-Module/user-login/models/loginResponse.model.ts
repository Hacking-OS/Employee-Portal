export interface LoginResponse {
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
