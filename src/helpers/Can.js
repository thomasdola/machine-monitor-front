import _includes from "lodash/includes";
import _find from "lodash/find";
import _isEqual from 'lodash/isEqual';

export default class Can{

    constructor(user){
        this.user = user;
    }

    static User(user){
        return new Can(user);
    }

    access(page){
        if(!page) throw new Error(`Gate is ${page}`);

        let canHe = false;
        console.log(this.user);

        const {gates} = this.user.role;
        canHe = _includes(gates, page);

        return canHe;
    }

    perform(action, entity, page){
        if(!action) throw new Error(`Action is ${action}`);
        if(!entity) throw new Error(`Entity is ${entity}`);
        if(!page) throw new Error(`Gate is ${page}`);

        let canHe = false;

        const {policies} = this.user.role;

        if(policies.length < 1) return canHe;

        canHe = !!_find(policies, ({gate: {name: gateName}, entity: {name: entityName}, actions}) => {
            return _isEqual(gateName, page)
                && _isEqual(entityName, entity)
                && !!_find(actions, ({name: actionName}) => _isEqual(actionName, action));
        });

        return canHe;
    }
}