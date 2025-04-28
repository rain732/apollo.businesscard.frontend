export class ResetPasswordDto {
  public email!: string;
  public username!: string;
  public captchaKey!: string;
  public captchaValue!: string;
}
