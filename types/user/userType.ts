// User-specific types

export interface User {
  _id: string;
  phone?: string;
  email: string;
  roles?: ("ADMIN" | "USER")[];
  createdAt: string;
  updatedAt: string;
  name?: string;
}
