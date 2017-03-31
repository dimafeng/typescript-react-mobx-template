import {Observable} from 'rx';
import {User, Transaction} from './model';
import {Rest} from '../app/Rest';
import {Config} from '../app/Config';

export class UserService {
    getUsers(): Observable<User[]> {
        return Rest.doGet<User[]>(`${Config.BASE_URL}/users`);
    }

    getUser(userId: number): Observable<User> {
        return Rest.doGet<User>(`${Config.BASE_URL}/users/${userId}`);
    }

    getUserTransactions(userId: number): Observable<Transaction[]> {
        return Rest.doGet<Transaction[]>(`${Config.BASE_URL}/users/${userId}/transactions`);
    }
}