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

export interface IGenericFormInput {

}

 export interface IFormInput extends IGenericFormInput {
    username: string;
    password: string;
  }
  
  export interface IRegistrationFormInput extends IFormInput {
    confirmPassword: string;
  }

export interface InputFieldProp {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

export interface ISongFormProps {
  title: string | undefined;
  artist: string | undefined;
  album: string | undefined;
  genre: string | undefined;
}

export interface ISongFormInput extends IGenericFormInput{
  title: string;
  artist: string;
  album: string;
  genre: string;
}