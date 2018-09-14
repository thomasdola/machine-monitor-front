import React from 'react';
import {
    Alert,
    Button,
    Classes,
    Dialog,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading, Spinner
} from "@blueprintjs/core";
import './index.css';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {logout} from "../../../actions/authActions";
import _isEqual from "lodash/isEqual";
import {LOGOUT} from "../../../helpers/constants";


class Header extends React.Component{
    state = {
        profile: false,
        confirmLogout: false
    };

    componentDidUpdate(prevProps){
        const {OPERATION_SUCCESSFUL: OLD_OPERATION_SUCCESSFUL, OPERATION_FAILED: OLD_OPERATION_FAILED} = prevProps;

        const {OPERATION_SUCCESSFUL, OPERATION_FAILED} = this.props;

        if(!_isEqual(OLD_OPERATION_SUCCESSFUL, OPERATION_SUCCESSFUL)){
            const {action} = OPERATION_SUCCESSFUL;

            if(action === LOGOUT){
                this.props.history.replace('/auth/login');
                // window.location.href = "/auth/login";
            }
        }

        if(!_isEqual(OLD_OPERATION_FAILED, OPERATION_FAILED)){
            const {action} = OPERATION_FAILED;

            if(action === LOGOUT){
                console.log(OPERATION_FAILED.data);
            }
        }

    }

    logout = () => {
        const {authUser: {token}, logout} = this.props;
        logout(token);
    };

    render(){
        return [

            <Navbar key="nav" className="bp3-dark">
                <NavbarGroup>
                    <NavbarHeading>
                        MMonitor
                    </NavbarHeading>
                </NavbarGroup>
                <NavbarGroup align="right">
                    <NavbarDivider/>
                    <Button
                        intent={Intent.DANGER}
                        minimal={true}
                        onClick={() => this.logout()}
                        icon="power"/>
                </NavbarGroup>
            </Navbar>,

            <Dialog
                key={"Alert"}
                title={"Terminating session..."}
                canEscapeKeyCancel={false}
                canOutsideClickCancel={false}
                isCloseButtonShown={false}
                icon="power"
                intent={Intent.DANGER}
                isOpen={this.props.loadingLogout}
            >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className={Classes.DIALOG_BODY}>
                    <p>
                        <Spinner/>
                    </p>
                </div>
            </Dialog>
        ];
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,

        authUser: PropTypes.object.isRequired,
        OPERATION_SUCCESSFUL: PropTypes.object.isRequired,
        OPERATION_FAILED: PropTypes.object.isRequired,
        loadingLogout: PropTypes.bool.isRequired
    };
}

const mapStateToProps = ({authUser, loadingLogout, OPERATION_SUCCESSFUL, OPERATION_FAILED}) => (
    {authUser, loadingLogout, OPERATION_SUCCESSFUL, OPERATION_FAILED});
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
