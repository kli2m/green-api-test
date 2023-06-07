import * as yup from 'yup';

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
