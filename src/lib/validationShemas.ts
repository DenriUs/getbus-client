import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Введіть правильний email')
    .required('Введіть ваш email'),
  password: yup
    .string()
    .required('Введіть ваш пароль'),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('Введіть ваше ім\'я'),
  lastName: yup
    .string()
    .required('Введіть ваше прізвище'),
  password: yup
    .string()
    .required('Введіть ваш пароль')
    .min(8, 'Пароль повинен містити мінімум 8 символів')
    .test(
      'is-password-valid',
      'Пароль повинен містити цифри і латинськи букви, в тому числі і заголовні',
      (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value as string)
    ),
  confirmPassword: yup
    .string()
    .required('Підтвердіть свій пароль')
    .oneOf([yup.ref('password')], 'Паролі повинні збігатися'),
  birthDate: yup
    .string()
    .required('Виберіть дату народження'),
  email: yup
    .string()
    .required('Введіть ваш email')
    .email('Введіть правильний email'),
  phoneNumber: yup
    .string()
    .required('Введіть ваш номер телефону')
    .min(9, 'Введіть ваш номер телефону'),
});
