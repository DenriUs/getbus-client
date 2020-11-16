import axios, { AxiosError, AxiosInstance } from 'axios';
import { AsyncStorage } from 'react-native';
import { jwtAsyncStorageKeyName, mainAxiosRequestConfig } from './constants';
import { GetResponse, PostResponse } from './entities';

let axiosInstance: AxiosInstance;

export async function updateAxiosInstance() {
  axiosInstance = axios.create({
    ...mainAxiosRequestConfig,
    headers: { Athorization: `Bearer ${await AsyncStorage.getItem(jwtAsyncStorageKeyName)}` }
  });
}

async function sendGetRequest(endpoint: string): Promise<GetResponse> {
  try {
    const response = await axiosInstance.get(endpoint);
    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
}

async function sendPostRequest(endpoint: string, data: {}): Promise<PostResponse> {
  try {
    await axiosInstance.post(endpoint, data);
    return {};
  } catch (error) {
    return { error: error.response };
  }
}

export async function login(email: string, password: string ): Promise<PostResponse> {
  return sendPostRequest('/auth/login', { email, password });
}

export async function checkLoginStatus(): Promise<GetResponse> {
  return sendGetRequest('/auth/checkLoginStatus');
}
