import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, InputGroup, Intent, Tooltip} from '@blueprintjs/core';
import './index.css';
import {bindActionCreators} from "redux";
import {login} from "../../actions/authActions";
import {connect} from "react-redux";
import _isEqual from 'lodash/isEqual';
import {LOGIN, LOGOUT} from "../../helpers/constants";
import {withRouter} from "react-router-dom";

class Login extends React.Component{

    state = {
        showPassword: false,
        username: "",
        password: ""
    };

    componentDidUpdate(prevProps){
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;

        const {OPERATION_SUCCESSFUL, OPERATION_FAILED} = this.props;

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const {action} = OPERATION_SUCCESSFUL;

            if(action === LOGIN){
                window.location.href = "/";
            }
        }

        if(!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)){
            const {action} = OPERATION_FAILED;

            if(action === LOGIN){
                console.log(OPERATION_FAILED.data);
            }
        }

    }

    render(){

        const {showPassword, username, password} = this.state;

        const lockButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={false}>
                <Button
                    disabled={false}
                    icon={showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );

        return (
            <div className={"login__Page"}>
                <div>
                    Login
                </div>

                <form action="">
                    <div>
                        <InputGroup
                            value={username}
                            disabled={false}
                            large={false}
                            placeholder="Enter your username..."
                            rightElement={<Icon icon={"person"}/>}
                            type={"email"}
                            onChange={e => this.setState({username: e.target.value.trim()})}
                        />
                    </div>
                    <div>
                        <InputGroup
                            value={password}
                            disabled={false}
                            large={false}
                            placeholder="Enter your password..."
                            rightElement={lockButton}
                            type={showPassword ? "text" : "password"}
                            onChange={e => this.setState({password: e.target.value.trim()})}
                        />
                    </div>
                    <div>
                        <Button
                            text={"Login"}
                            fill={true}
                            loading={this.props.loadingLogin}
                            disabled={false}
                            icon={"lock"}
                            intent={Intent.PRIMARY}
                            onClick={this.handleLoginClick}
                        />
                    </div>
                </form>
            </div>
        );
    }

    handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

    handleLoginClick = () => {
        const {username, password} = this.state;
        if(username.trim() && password.trim()){
            this.props.login({email: username, password});
        }
    };

    static propTypes = {
        history: PropTypes.object.isRequired,

        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,

        login: PropTypes.func.isRequired,
        loadingLogin: PropTypes.bool.isRequired
    };
}

const mapStateToProps = ({loadingLogin, OPERATION_SUCCESSFUL, OPERATION_FAILED}) => (
    {loadingLogin, OPERATION_SUCCESSFUL, OPERATION_FAILED});
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));