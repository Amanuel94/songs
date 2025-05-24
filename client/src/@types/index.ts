export interface Account {
  username: string
  password: string
  role: 'user' | 'admin'
}

export interface FormData {
  username: Account['username']
  password: Account['password']
}

export interface cardProp {
  imgSrc: string
  caption: string
}

 export interface IFormInput {
    username: string;
    password: string;
    confirmPassword: string;
  }

export interface InputFieldProp {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}
