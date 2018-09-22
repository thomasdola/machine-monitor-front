import React from 'react';

export const Search = ({value, onQueryChange, onQueryClear, onSearch}) => {
    const _onKeyPress = ({keyCode}) => {
        if(keyCode === 13){
            onSearch();
        }
    };

    return (
        <div className="bp3-input-group" style={{flexBasis: '500px'}}>
            <input
                onKeyDown={_onKeyPress}
                value={value}
                onChange={onQueryChange}
                type="text" className="bp3-input" placeholder="Search" />

            {value &&
            <button onClick={onQueryClear}
                    className={`bp3-button bp3-minimal bp3-intent-danger bp3-icon-small-cross`}/>
            }

            <button onClick={onSearch}
                    className={`bp3-button bp3-intent-primary bp3-icon-search`}/>
        </div>
    );
};