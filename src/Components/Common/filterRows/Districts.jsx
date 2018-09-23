import PropTypes from "prop-types";
import React from "react";
import {connect} from 'react-redux';
import {DataListSelect, LongList} from '../Lists';
import _now from 'lodash/now';

const ID = _now();

class Districts extends React.Component{
    static propTypes = {
        authUser: PropTypes.object.isRequired,
        districts: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired,
        small: PropTypes.bool,
        disabled: PropTypes.bool,
        dataList: PropTypes.bool,
        dependent: PropTypes.bool,
    };

    constructor(props){
        super(props);
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    _handleOnChange({id}){
        const {onChange} = this.props;
        onChange({label: "district", value: id});
    }

    render(){
        const {districts, value, small, disabled, dataList, dependent} = this.props;
        const shouldBe = disabled || dependent;
        return dataList ? (
            <DataListSelect
                disabled={shouldBe}
                small={small}
                defaultValue={value}
                onChange={this._handleOnChange}
                items={districts} dataListId={ID}/>
        ) : (
            <LongList
                label={'district'}
                disabled={shouldBe}
                small={small}
                defaultValue={value}
                onChange={this._handleOnChange}
                items={districts}/>
        ) ;
    }
}

const mapStateToProps = ({districts, authUser}) => ({districts, authUser});

export default connect(mapStateToProps)(Districts);