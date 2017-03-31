import * as React from 'react';
import {inject} from 'mobx-react';
import {RouteStore} from './RouteStore';
import {Link} from 'react-router-dom';
import FontAwesome = require('react-fontawesome');

interface Props {
    routeStore?: RouteStore;
}

@inject('routeStore')
export class Menu extends React.Component<Props, any> {
    render() {
        return (
            <ul className="nav" id="menu">
                {this.props.routeStore.routes
                    .filter(r => !!r.title)
                    .map(r => <li key={r.mapping}>
                        <Link key={r.mapping} to={r.mapping}>
                            <FontAwesome name={r.icon} /> {r.title}
                        </Link>
                    </li>)}
            </ul>
        );
    }
}
