import { ColProps } from 'react-bootstrap';

interface IValidation {
  type: string;
  msg: string;
  numParam?: number;
}

export interface IIValidation {
  [key: string]: IValidation[];
}

interface SOpt {
  value: string;
  label: string;
}

export interface IFormField extends ColProps {
  name: string;
  label: string; //placeholder
  classes?: string;
  ftype?: 'email' | 'select' | 'text' | 'textarea' | 'password'; // default is text
  multi?: boolean; // incase of multi select
  opts?: SOpt[] | string[]; // incase of select
}

export interface IPForm {
  fields: IFormField[];
  validations?: IIValidation | {};
}

export interface IForm extends IPForm {
  btnLabel: string;
  formClass?: string;
  onFSubmit(vals: any): Promise<any>;
}
