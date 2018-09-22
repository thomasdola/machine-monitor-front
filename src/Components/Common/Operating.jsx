import React from 'react';

import {Dialog, ProgressBar} from "@blueprintjs/core";

export const Operating = ({on, intent, percentage, content}) => {
    const value = percentage ? (percentage / 100) : 1;
    return (<Dialog
            backdropClassName="transparent__back"
            style={{width: '300px', paddingBottom: 0}}
            lazy
            canOutsideClickClose={false}
            isOpen={on}
        >
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-even'}} className="bp3-dialog-body">
                {content ? <div style={{marginBottom: 5}}>{content}</div> : null}
                <ProgressBar intent={intent} value={value}/>
            </div>
        </Dialog>
    )
};