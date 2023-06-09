import * as yup from 'yup';

// import { REGEXP_PHONE } from './reg-expressions';

export const schema = yup
  .object({
    idInstance: yup
      .string()
      .typeError('Must be a string')
      .matches(/^\d{10}$/i, 'Does not comply with the rule'),
    apiTokenInstance: yup
      .string()
      .typeError('Must be a string')
      .required('The field cannot be empty'),
  })
  .required();

export const schemaTwo = yup
  .object({
    phone: yup
      .string()
      .required('The field cannot be empty')
      .matches(/^\d{12,}$/i, 'It is necessary to specify the phone number in the international format'),
  })
  .required();
