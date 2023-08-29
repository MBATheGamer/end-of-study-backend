export class UserUpdateDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  mobile?: string;
  address?: string;
  roleId: number;
  classroomId?: number;
}