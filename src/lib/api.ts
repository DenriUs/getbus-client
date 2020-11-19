import axios, { AxiosInstance } from 'axios';
import { AsyncStorage } from 'react-native';
import { jwtAsyncStorageKeyName, mainAxiosRequestConfig } from './constants';
import { IBus, IBusType, ITicket, ITrip, IUser, ServerResponse } from './entities';
import Roles from './roles';
import { TripState } from './tripState';

let axiosInstance: AxiosInstance;

export async function updateAxiosInstance() {
  axiosInstance = axios.create({
    ...mainAxiosRequestConfig,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem(jwtAsyncStorageKeyName)}`,
    },
  });
}

async function sendGetRequest(endpoint: string, data?: {}): Promise<ServerResponse> {
  try {
    const response = await axiosInstance.get(endpoint, { params: data });
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
}

async function sendPostRequest(endpoint: string, data?: {}): Promise<ServerResponse> {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
}

export async function login(email: string, password: string ): Promise<ServerResponse> {
  const response = await sendPostRequest('/auth/login', { email, password });
  if (response.error) {
    return { error: response.error };
  }
  if (response.data) {
    await AsyncStorage.setItem(jwtAsyncStorageKeyName, response.data.accessToken);
    await updateAxiosInstance();
  }
  return {};
}

export async function logout(): Promise<void> {
  await AsyncStorage.setItem(jwtAsyncStorageKeyName, '');
  await updateAxiosInstance();
}

export async function register(
  firstName: string,
  lastName: string,
  password: string,
  birthDate: Date,
  email: string,
  passportNo: string,
  phoneNumber: string,
): Promise<ServerResponse> {
  return sendPostRequest('/auth/register', {
    firstName,
    lastName,
    password,
    birthDate,
    email,
    passportNo,
    phoneNumber,
  });
}

export async function registerWorker(
  firstName: string,
  lastName: string,
  password: string,
  birthDate: Date,
  email: string,
  passportNo: string,
  phoneNumber: string,
  role: Roles,
): Promise<ServerResponse> {
  return sendPostRequest('/auth/registerWorker', {
    firstName,
    lastName,
    password,
    birthDate,
    email,
    passportNo,
    phoneNumber,
    role,
  });
}

export async function deleteWorker(workerId: string): Promise<ServerResponse> {
  return sendPostRequest(`/user/delete/${workerId}`);
}

export async function checkLoginStatus(): Promise<ServerResponse> {
  return sendGetRequest('/auth/checkLoginStatus');
}

export async function getOwnInfo(): Promise<IUser | undefined> {
  const response = await sendGetRequest('/user/getOwnInfo');
  if (response) {
    return response.data as IUser;
  }
}

export async function getOwnRole(): Promise<ServerResponse> {
  return sendGetRequest('/user/getOwnRole');
}

export async function getUsersInRole(role: Roles): Promise<IUser[] | undefined> {
  const response = await sendGetRequest(`/user/getUsersInRole/${role}`);
  if (response) {
    return response.data as IUser[];
  }
}

export async function addBusType(name: string): Promise<ServerResponse> {
  return sendPostRequest('/busType/create', { name });
}

export async function getBusTypes(): Promise<IBusType[] | undefined> {
  const response = await sendGetRequest('/busType/getAll');
  if (response) {
    return response.data as IBusType[];
  }
}

export async function deleteBusType(busTypeId: number): Promise<ServerResponse> {
  return sendPostRequest(`/busType/delete/${busTypeId}`);
}

export async function addBus(
  name: string,
  seatsAmount: number,
  number: number,
  busTypeId: number,
  busDriverId: string,
): Promise<ServerResponse> {
  return sendPostRequest('/bus/create', { name, seatsAmount, number, busTypeId, busDriverId });
}

export async function getBuses(): Promise<IBus[] | undefined> {
  const response = await sendGetRequest('/bus/getAll');
  if (response) {
    return response.data as IBus[];
  }
}

export async function getBusByDriverId(driverId: string): Promise<IBus | undefined> {
  console.log('Id: ', driverId)
  const response = await sendGetRequest(`/bus/getByDriverId/${driverId}`);
  if (response) {
    return response.data as IBus;
  }
}

export async function checkIfBusNumberIsUnique(number: number): Promise<ServerResponse> {
  return await sendGetRequest(`/bus/checkIfBusNumberIsUnique/${number}`);
}

export async function deleteBus(busTypeId: number): Promise<ServerResponse> {
  return sendPostRequest(`/bus/delete/${busTypeId}`);
}

export async function getBusDriversWithoutBus(): Promise<IUser[] | undefined> {
  const response = await sendGetRequest('/user/getBusDriversWithoutBus');
  if (response) {
    return response.data as IUser[];
  }
}

export async function addTrip(
  departureCity: string,
  arrivalCity: string,
  departureDateTime: Date,
  arrivalDateTime: Date,
  availableSeatsAmount: number,
  seatPrice: number,
  tripTime: string,
  tripState: TripState,
  busDriverId: string,
): Promise<ServerResponse> {
  return sendPostRequest('/trip/create', {
    departureCity,
    arrivalCity,
    departureDateTime,
    arrivalDateTime,
    availableSeatsAmount,
    seatPrice,
    tripTime,
    tripState,
    busDriverId,
  });
}

export async function getTrips(): Promise<ITrip[] | undefined> {
  const response = await sendGetRequest('/trip/getAll');
  if (response) {
    return response.data as ITrip[];
  }
}

export async function deleteTrip(tripId: number): Promise<ServerResponse> {
  return sendPostRequest(`/trip/delete/${tripId}`);
}

export async function getInProgressTrips(): Promise<ITrip[] | undefined> {
  const response = await sendGetRequest('/trip/getInProgressTrips');
  if (response) {
    return response.data as ITrip[];
  }
}

export async function getBusDriversForTrip(): Promise<IUser[] | undefined> {
  const response = await sendGetRequest('/user/getBusDriversForTrip');
  if (response) {
    return response.data as IUser[];
  }
}

export async function searchTrips(
  departureCity: string,
  arrivalCity: string,
  departureDateTime: Date
): Promise<ITrip[] | undefined> {
  const response = await sendGetRequest('/trip/searchTrips', {
    departureCity,
    arrivalCity,
    departureDateTime,
  });
  if (response) {
    return response.data as ITrip[];
  }
}

export async function orderTicket(
  price: number,
  tripId: number,
): Promise<ServerResponse> {
  return sendPostRequest(`/ticket/create`, { price, tripId });
}

export async function getUserTickets(): Promise<ITicket[] | undefined> {
  const response = await sendGetRequest('/ticket/get');
  if (response) {
    return response.data as ITicket[];
  }
}
