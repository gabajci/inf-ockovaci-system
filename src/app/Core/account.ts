export interface Account {
    id: number;
    mail: string;
    password: string;
    admin: number;  
    storedSalt: string;  
  }
  