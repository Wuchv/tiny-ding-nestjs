import { IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsNotEmpty({ message: 'phone_number不能为空' })
  readonly phone_number: string;
  @IsNotEmpty({ message: 'password不能为空' })
  readonly password: string;
}
