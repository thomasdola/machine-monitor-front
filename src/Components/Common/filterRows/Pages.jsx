import PropTypes from "prop-types";
import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadPages, loadEntities} from '../../../actions/roleActions';
import {ShortList} from '../Lists';
import _find from "lodash/find";
import _isEqual from 'lodash/isEqual';

class Pages extends React.Component{
    static propTypes = {
        pages: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,
        loadPages: PropTypes.func.isRequired,
        loadEntities: PropTypes.func.isRequired,
        small: PropTypes.bool,
    };

    componentDidMount(){
        const {loadPages, value} = this.props;
        loadPages();
        this.props.loadEntities({f: `g|${value.id}`});
    }

    componentDidUpdate(prevProps){
        const {value: prevValue} = prevProps;
        const {value, authUser: {token}, loadEntities} = this.props;

        if(!_isEqual(prevValue, value)){
            loadEntities(token, {f: `page|${value.id}`});
        }
    }

    _handleOnChange = (value) => {
        const {loadEntities, onChange, pages, authUser: {token}} = this.props;
        loadEntities(token, {f: `page|${value}`});
        onChange({label: "page", value: _find(pages, {id: Number.parseInt(value, 10)})});
    };

    render(){
        const {pages, value, small} = this.props;
        return (
            <ShortList
                small={small}
                defaultValue={value.id}
                onChange={this._handleOnChange}
                items={pages}/>
        );
    }
}

const mapStateToProps = ({pages}) => ({pages});
const mapDispatchToProps = dispatch => bindActionCreators({loadPages, loadEntities}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);