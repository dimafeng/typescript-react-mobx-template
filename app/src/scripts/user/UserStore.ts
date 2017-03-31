import {diInject} from '../app/DIContext';
import {UserService} from './UserService';
import {observable, runInAction} from 'mobx';
import {User, Transaction} from './model';
import {Observable} from 'rx';

export class UserStore {
    createUserViewStore() {
        return new UserViewStore();
    }

    createUserDetailsViewStore(userId: number) {
        return new UserDetailsViewStore(userId);
    }
}

export class UserViewStore {
    @diInject() userService: UserService;

    @observable users: User[] = [];

    constructor() {
        this.userService.getUsers().subscribe(
            users => this.users = users
        )
    }
}

export class UserDetailsViewStore {
    @diInject() userService: UserService;

    @observable user: User;
    @observable transactions: Transaction[] = [];

    constructor(userId: number) {
        const user$ = this.userService.getUser(userId);
        const transactions$ = this.userService.getUserTransactions(userId);
        Observable.zip(user$, transactions$)
            .subscribe(
                ([user, transactions]) =>
                    runInAction(() => {
                        this.user = user;
                        this.transactions = transactions;
                    })
            );
    }
}