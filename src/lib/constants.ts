import { AxiosRequestConfig } from 'axios';
import { DefaultTheme } from 'react-native-paper';

import ukraineFlag from '../../assets/ukraineFlag.png';
import loginCircles from '../../assets/loginCircles.png';
import Roles from './roles';

const axiosTimeoutSeconds = 20;

export const jwtAsyncStorageKeyName = 'jwt';

export const mainAxiosRequestConfig: AxiosRequestConfig = {
  baseURL: 'https://e1c0897c9222.ngrok.io',
  timeout: axiosTimeoutSeconds * 1000,
}

export const loadingSpinnerSize = 80;
export const bottomSheetLoadingSpinnerSize = 50;

export const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    accent: '#2b90ff',
    placeholder: '#ffffff',
    text: '#ffffff',
    background: 'transparent'
  },
};

export const mainBackgroundColor = '#5ca6f7';

export const inputUnderlineColors = {
  primary: 'rgba(255, 255, 255, 0.5)',
  accent: 'rgba(43, 144, 255, 0.5)',
}

export const bottomSheetSnapConfig = [
  '89%',
  '48%',
  '0%',
];

export const bottomSheetBorderRaius = 20;

export const bottomTabIconSize = 25;

export const yearMonths = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

export const appImages = {
  ukraineFlag,
  loginCircles,
}

export const workersDropdownData = [
  {
    label: 'Водій',
    value: Roles.BusDriver,
  },
  {
    label: 'Диспетчер',
    value: Roles.Dispatcher,
  },
]

export const ukraineCities = [
  'Полтава',
  'Київ',
  'Харків',
  'Чернігів',
  'Суми',
  'Черкаси',
  'Кропивницький',
  'Дніпро',
  'Запоріжжя',
  'Херсон',
  'Житомир',
  'Рівне',
  'Луцьк',
  'Львів',
  'Ужгород',
  'Івано-Франківськ',
  'Хмельницький',
  'Чернівці',
  'Вінниця',
  'Миколаїв',
  'Одеса',
  'Тернопіль',
]
