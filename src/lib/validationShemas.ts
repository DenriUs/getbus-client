import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Введіть правильний email')
    .required('Введіть email'),
  password: yup
    .string()
    .required('Введіть пароль'),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('Введіть ім\'я'),
  lastName: yup
    .string()
    .required('Введіть прізвище'),
  password: yup
    .string()
    .required('Введіть пароль')
    .min(8, 'Пароль повинен містити мінімум 8 символів')
    .test(
      'is-password-valid',
      'Пароль повинен містити цифри і латинськи букви, в тому числі і заголовні',
      (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value as string)
    ),
  confirmPassword: yup
    .string()
    .required('Підтвердіть пароль')
    .oneOf([yup.ref('password')], 'Паролі повинні збігатися'),
  birthDate: yup
    .string()
    .required('Виберіть дату народження'),
  email: yup
    .string()
    .required('Введіть email')
    .email('Введіть правильний email'),
  passportNo: yup
    .string()
    .required('Введіть номер паспорту')
    .max(9),
  phoneNumber: yup
    .string()
    .required('Введіть номер телефону')
    .min(9, 'Введіть номер телефону'),
});

export const busTypeSchema = yup.object({
  name: yup
    .string()
    .required('Введіть назву типу автобуса'),
});

export const busSchema = yup.object({
  name: yup
    .string()
    .required('Введіть назву автобуса'),
  seatsAmount: yup
    .number()
    .required('Введіть к-ть місць в автобусі'),
  number: yup
    .number()
    .required('Введіть номер автобуса'),
});

export const tripSchema = yup.object({
  departureDateTime: yup
    .string()
    .required('Виберіть дату та час відправки'),
  arrivalDateTime: yup
    .string()
    .required('Виберіть дату та час прибуття'),
  seatPrice: yup
    .number()
    .required('Введіть ціна за місце')
});
