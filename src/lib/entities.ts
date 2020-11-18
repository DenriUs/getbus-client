import Roles from "./roles";
import { SupportRequestState } from "./supportRequestState";
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
  workerSupportRequests?: ISupportRequest[];
  userSupportRequests?: ISupportRequest[];
  messages?: IMessage[];
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

export interface ISupportRequest {
  id: number;
  name: string;
  creationDate: string;
  supportRequestState: SupportRequestState;
  userId: string;
  supportWorkerId: string;
  user?: IUser;
  supportWorker?: IUser;
  messages?: IMessage[];
}

export interface IMessage {
  id: number;
  text: string;
  sentDateTime: Date;
  userId: string;
  supportRequestId: number;
  user?: IUser;
  supportRequest?: ISupportRequest;
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
