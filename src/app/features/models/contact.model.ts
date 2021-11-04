export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}