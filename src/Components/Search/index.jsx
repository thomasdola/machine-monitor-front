import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem} from '@blueprintjs/core';
import {Omnibar} from "@blueprintjs/select";

class Search extends React.Component{

    render(){

        return (
            <Omnibar
                isOpen={this.props.isOpen}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={this.handleItemSelect}
                onClose={this.handleClose}
                itemPredicate={this.filterMRW}
                itemRenderer={this.renderMRW}
                items={this.props.MRWs}
            />
        );
    }

    handleItemSelect = MRW => {
        this.handleClose();
        this.props.onMRWSelect(MRW);
    };

    handleClose = () => this.props.onClose();

    renderMRW = (MRW, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        const text = `${MRW.name}`;
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={MRW.network.provider}
                key={MRW.id}
                onClick={handleClick}
                text={Search.highlightText(text, query)}
            />
        );
    };

    filterMRW = (query, MRW) => {
        return `${MRW.name}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    static highlightText(text, query) {
        let lastIndex = 0;
        const words = query
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(Search.escapeRegExpChars);
        if (words.length === 0) {
            return [text];
        }
        const regexp = new RegExp(words.join("|"), "gi");
        const tokens = [];
        while (true) {
            const match = regexp.exec(text);
            if (!match) {
                break;
            }
            const length = match[0].length;
            const before = text.slice(lastIndex, regexp.lastIndex - length);
            if (before.length > 0) {
                tokens.push(before);
            }
            lastIndex = regexp.lastIndex;
            tokens.push(<strong style={{ color: "#ccc"}} key={lastIndex}>{match[0]}</strong>);
        }
        const rest = text.slice(lastIndex);
        if (rest.length > 0) {
            tokens.push(rest);
        }
        return tokens;
    }

    static escapeRegExpChars(text) {
        return text.replace(/([.*+?^=!:${}()|\]\\])/g, "\\$1");
    }

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        MRWs: PropTypes.array.isRequired,
        onMRWSelect: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }
}

export default Search;