import { UserActivity } from "./user.activity";

export class User {
    id: number;
    fullname: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    userActivityList: UserActivity[];
}