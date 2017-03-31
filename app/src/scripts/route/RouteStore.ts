import * as React from 'react';
import {SettingsView} from '../settigs/SettingsView';
import {UsersView} from '../user/UsersView';
import {UsersDetailsView} from '../user/UserDetailsView';

export const USERS_MAPPING = '/users';
export const USER_DETAILS_MAPPING = '/user/:userId';

export const linkToUserDetails =
    (userId: number) => USER_DETAILS_MAPPING.replace(':userId', userId.toString());

export class RouteStore {
    routes: Array<Route> = [
        {
            title: 'Users',
            icon: 'users',
            mapping: USERS_MAPPING,
            component: UsersView
        },
        {
            title: 'Settings',
            icon: 'cogs',
            mapping: '/settings',
            component: SettingsView
        },
        {
            mapping: USER_DETAILS_MAPPING,
            component: UsersDetailsView
        }
    ];
}

interface Route {
    title?: string;
    icon?: string;
    mapping: string;
    component: React.ReactType;
}