import * as React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {Menu} from './route/Menu';
import {RouteStore, USERS_MAPPING} from './route/RouteStore';
import '../styles/styles.scss';
import {diContext} from './app/DIContext';
import {UserService} from './user/UserService';
import {UserStore} from './user/UserStore';

export class App extends React.Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
        diContext.routeStore = new RouteStore();
        diContext.userStore = new UserStore();
        diContext.userService = new UserService();
    }

    render() {
        return (
                <Provider {...diContext}>
                    <Router>
                        <Container>
                            <Switch>
                                {diContext.routeStore.routes
                                    .map(r => <Route key={r.mapping} exact path={r.mapping} component={r.component}/>)}
                                <Redirect from="/" to={USERS_MAPPING}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                    </Router>
                </Provider>
        )
    }
}

export const Container = (props: {children?: any}) =>
    <div className="page-container">
        <div className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">App Name</a>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">

                <div className="col-xs-6 col-sm-3" id="sidebar">
                    <Menu />
                </div>
                <div className="col-xs-12 col-sm-9">
                    {props.children}
                </div>
            </div>
        </div>
    </div>;

export const NotFound = () => <div>Page not found</div>;