export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface StoredUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
