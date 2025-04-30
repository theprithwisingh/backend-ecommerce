export interface SignupInput {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: {
      name: string;
      email: string;
    };
  }
  