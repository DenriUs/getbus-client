import { Alert } from "react-native";
import { date } from "yup";

export const formatDate = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day < 10 ? `0${day}` : day }.${month < 10 ? `0${month}` : month }.${year}`;
}

export const subtracDateYears = (date: Date, subtractNumber: number): Date => {
  date.setFullYear(date.getFullYear() - subtractNumber, date.getMonth(), date.getDate());
  return date;
}

export const getDifferenceBetweenDatesInYears = (firstDate: Date, secondDate: Date): number => {
  const date = new Date(secondDate);
  let yearDifference = firstDate.getFullYear() - date.getFullYear();
  const monthDifference = firstDate.getMonth() - date.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && firstDate.getDate() < date.getDate())) {
    yearDifference = yearDifference - 1;
  }
  return yearDifference;
}

export const callRepeatAlert = (
  onRepeatPressHandler: () => Promise<void>,
  message?: string,
  onCancelPressHandler?: () => void,
) => {
  Alert.alert(
    'Помилка',
    message ? message : 'Спробуйте ще раз пізніше',
    [
      {
        text: 'Повторити',
        onPress: async () => await onRepeatPressHandler()
      },
      {
        text: onCancelPressHandler ? 'Відмінити' : '',
        style: 'cancel',
        onPress: onCancelPressHandler,
      },
    ],
    { cancelable: false },
  )
}

export const callConfirmationAlert = (
  alertMessage: string,
  confirmationHandler: () => void
) => {
  Alert.alert(
    'Увага!',
    alertMessage,
    [
      {
        text: 'Підтвердити',
        onPress: confirmationHandler,
      },
      {
        text: 'Відмінити',
        style: 'cancel',
      },
    ],
    { cancelable: false },
  )
}

export const subscribeToNavigationEvent = (
  navigation: any,
  event: 'focus' | 'blur',
  handler: () => Promise<void> | void
) => {
  navigation.addListener(event, handler);
}

export const unsubscribeToNavigationEvent = (navigation: any, event: 'focus' | 'blur') => {
  navigation.removeListener(event);
}
