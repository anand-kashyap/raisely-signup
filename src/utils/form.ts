import { IPForm } from 'interfaces/Form';
import * as yup from 'yup';

export const formSubmit = (handleSubmit) => {
  return (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleSubmit(e);
  };
};

export const initVals = ({ fields, validations = {} }: IPForm): any => {
  const json: any = {},
    schema: any = {},
    reqFields: any = {};

  fields.forEach((f) => {
    json[f.name] = '';
    if (validations[f.name]) {
      let vdator = yup.string();
      for (const valid of validations[f.name]) {
        if (valid.type === 'required') {
          reqFields[f.name] = true;
        }
        if (valid.numParam) {
          vdator = vdator[valid.type](valid.numParam, valid.msg);
        } else {
          vdator = vdator[valid.type](valid.msg);
        }
      }
      schema[f.name] = vdator;
    }
  });
  return { json, schema: yup.object(schema), reqFields };
};
