export class UserAddress {
  constructor(
    public street: string,
    public city: string,
    public state: string
  ) {}
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public occupation: string,
    public phone: string,
    public address: UserAddress,
    public aliases: string[]
  ) {}
}
