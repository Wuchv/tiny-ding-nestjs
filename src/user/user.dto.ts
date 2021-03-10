import { IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsNotEmpty({ message: 'account不能为空' })
  readonly account: string;
  @IsNotEmpty({ message: 'password不能为空' })
  readonly password: string;
}
