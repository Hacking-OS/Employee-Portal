// export interface User {
//   id: number;
//   userId: string;
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   salary: number;
//   isAdmin: boolean;
//   isTeamAdmin: boolean;
//   isUser: boolean;
//   refreshToken: string;
//   refreshTokenExpirationDate: string; // Alternatively, Date if you want to work with Date objects
// }
export interface IUserInfo {
  id: number;
  userId: string; // Guid in C# is usually represented as a string in TypeScript
  userName: string;
  email: string;
  assignedTeamID: string;
  refreshToken: string;
  refreshTokenExpirationDate?: Date | null; // Optional and nullable
  isAdmin: boolean;
  isTeamAdmin: boolean;
  isUser: boolean;
  teamName: string;
}
