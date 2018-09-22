import PropTypes from "prop-types";
import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MultipleLongList} from "../../Common/Lists";
import {loadUsers} from '../../../actions/userActions';
import _filter from 'lodash/filter'

class UsersMultiSelect extends React.Component{
    static propTypes = {
        users: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        loadUsers: PropTypes.func.isRequired,
        values: PropTypes.array.isRequired,
        small: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    constructor(props){
        super(props);
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    componentDidMount(){
        this.props.loadUsers();
    }

    _handleOnChange(users){
        const {onChange} = this.props;
        onChange({label: "users", value: users});
    }

    render(){
        const {users, values, small, disabled} = this.props;
        return (
            <MultipleLongList
                disabled={disabled || users.length < 1}
                label={'action'}
                small={small}
                defaultValues={values}
                onChange={this._handleOnChange}
                items={users}/>
        ) ;
    }
}

const mapStateToProps = ({users}) => (
    {
        users: () => {
            return _filter(users, ({role}) => role === null)
        }
    }
);
const mapDispatchToProps = dispatch => bindActionCreators({loadUsers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersMultiSelect);