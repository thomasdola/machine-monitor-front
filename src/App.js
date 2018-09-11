import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HeaderLeft from './Components/Header/Left';
import Sidebar from './Components/Sidebar';
import {connect} from "react-redux";
import Content from './Components/Content';
import './App.css';

const classNames = require('classnames');

const App = () => (
    <div key={"App"} className={classNames('App')}>
        <nav role={'navigation'} className={classNames('main__Sidebar')}>
            <div>
                <HeaderLeft/>
            </div>
            <div className={classNames('bottom__Dark')}>
                <Sidebar/>
            </div>
        </nav>
        <section className="main__Content">
            <Content/>
        </section>
    </div>
);

class System extends Component {
    render() {
        return (
            <App/>
        );
    }

    static propTypes = {
        userAuthenticated: PropTypes.bool.isRequired
    };
}

const mapStateToProps = ({userAuthenticated}) => ({userAuthenticated});

export default connect(mapStateToProps)(System);
