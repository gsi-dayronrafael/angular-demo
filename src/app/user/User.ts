type userAddress = {
  street: string;
  city: string;
  state: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  phone: string;
  address: userAddress;
  aliases: string[];
}
