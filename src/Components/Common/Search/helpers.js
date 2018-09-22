import _find from 'lodash/find';

export const formatRowsWithScopeFilters = (rows, scopeFilters) => {
    return rows.map(row => {
        const {label, body: {props}, body} = row;
        const scopeFilter = _find(scopeFilters, {label: label.toLocaleLowerCase()});
        if(scopeFilter){
            return {...row,
                isExpanded: true,
                disabled: true,
                body: {...body,
                    props: {...props,
                        value: scopeFilter.value, disabled: true
                    }
                }
            };
        }else{
            return row;
        }
    });
};


export function stringifyFilters(filters) {
    return filters.map(({label, value}) => `${label}|${value}`).join();
}