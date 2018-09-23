import PropTypes from "prop-types";
import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadRegions} from '../../../actions/regionsActions';
import {loadDistricts} from '../../../actions/districtsActions';
import {ShortList} from '../Lists';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';

class Regions extends React.Component{
    static propTypes = {
        authUser: PropTypes.object.isRequired,

        regions: PropTypes.array.isRequired,

        value: PropTypes.any.isRequired,

        onChange: PropTypes.func.isRequired,

        loadRegions: PropTypes.func.isRequired,

        loadDistricts: PropTypes.func.isRequired,

        small: PropTypes.bool,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    constructor(props){
        super(props);
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    componentDidMount(){
        const {loadRegions, authUser: {token}} = this.props;
        loadRegions(token, {});
    }

    componentDidUpdate(prevProps){
        const {value: oldValue, region: oldRegion} = prevProps;
        const {value, regions, loadDistricts, authUser: {token}} = this.props;

        const r = _find(regions, {id: Number.parseInt(value, 10)});
        if(oldValue !== value || !_isEqual(r, oldRegion)){
            r && loadDistricts(token, {f: `region|${value}`});
        }
    }

    _handleOnChange(value){
        const {onChange} = this.props;
        onChange({label: "region", value});
    }

    render(){
        const {regions, value, small, required, disabled} = this.props;
        return (
            <ShortList
                disabled={disabled}
                required={required}
                small={small}
                defaultValue={value}
                onChange={this._handleOnChange}
                items={regions}/>
        );
    }
}

const mapStateToProps = ({regions, authUser}) => ({regions, authUser});
const mapDispatchToProps = dispatch => bindActionCreators({loadDistricts, loadRegions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Regions);