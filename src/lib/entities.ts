import Roles from './roles';
import { TripState } from "./tripState";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
  passportNo: string;
  phoneNumber: string;
  role: Roles;
  pushNotificationToken?: string;
  trips?: ITrip[];
  tickets?: ITicket[];
}

export interface ITrip {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  availableSeatsAmount: number;
  seatPrice: number;
  tripTime: string;
  tripState: TripState;
  busDriverId?: string;
  busDriver?: IUser;
  tickets?: ITicket[];
}

export interface ITicket {
  id: number;
  price: string;
  userId: string;
  tripId: number;
  user?: IUser;
  trip?: ITrip;
}

export interface IBus {
  id: number;
  name: string;
  seatsAmount: number;
  number: number;
  busTypeId: number;
  busDriver?: IUser;
  busType?: IBusType;
}

export interface IBusType {
  id: number;
  name: string;
  buses?: IBus[];
}

export interface ServerResponse {
  data?: any;
  error?: any;
}

export interface IUserFormUpdate {
  firstName: string,
  lastName: string,
  birthDate: string,
  email: string,
  passportNo: string,
  phoneNumber: string,
}
