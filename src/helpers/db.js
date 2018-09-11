import _range from 'lodash/range';
import _padStart from 'lodash/padStart';
import _shuffle from 'lodash/shuffle';
import {makeid} from '../helpers';


export default {
    mrws: _range(1, 20).map(n => {
        return {
            id: `${makeid()}`,
            name: `MRW ${_padStart(`${n}`, 4, '0')}`,
            status: _shuffle(['OFF', 'ON'])[0],
            applications: [
                {name: "Enrolment", status: _shuffle(['Running', 'Stopped'])[0]},
                {name: "Issuance", status: _shuffle(['Running', 'Stopped'])[0]},
            ], 
            services: [
                {name: "Card Reader", status: _shuffle(['Running', 'Stopped'])[0]},
                {name: "X-Info Tech", status: _shuffle(['Running', 'Stopped'])[0]},
            ], 
            network: {
                ip: "10.23.523.12", 
                provider: _shuffle(['MTN', 'VODAFONE'])[0],
                interface: "MOBILE"
            }, 
            logs: [
                {date: (new Date()).toDateString(), user: "NIATECH", action: _shuffle(['Log In', 'Log Out'])[0]}
            ],
            deployments: [
                {center: "MINISTRY OF TOURISM", start_date: (new Date()).toDateString(), end_date: (new Date()).toDateString()}
            ],
            issues: [
                {
                    occurrence_date: (new Date()).toDateString(),
                    report_date: (new Date()).toDateString(),
                    reported_to: "John Doe",
                    description: "Can you expedite the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!",
                    resolved: false
                },
                {
                    occurrence_date: (new Date()).toDateString(),
                    report_date: (new Date()).toDateString(),
                    reported_to: "Jane Doe",
                    description: "Can you expedite the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!",
                    resolved: true,
                    resolution_date: (new Date()).toDateString(),
                    observation: "Can you expedite the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!",
                    resolved_by: "Jane Doe"
                }
            ]
        };
    }),

    user: {
        uuid: "jfauerahldfd",
        username: "john.doe@gmail.com",
        full_name: "John Doe",
        root: true,
        role: {
            name: 'role name',
            gates: ['users', "policies", "roles"],
            entities: [
                {name: 'User', actions: ['add', 'edit', 'delete']},
                {name: 'Role', actions: ['add']},
                {name: 'Policy', actions: ['add', 'edit']},
            ],
            policies: [
                {actions: [{name: "add"}, {name: "edit"}, {name: "delete"}], entity: {name: "user"}, gate: {name: "users"}},
                {actions: [{name: "add"}], entity: {name: "role"}, gate: {name: "roles"}},
                {actions: [{name: "add"}, {name: "edit"}], entity: {name: "policy"}, gate: {name: "roles"}},
            ]
        },
        channel: 'user_ee1cda0f-8a8b-4257-bfea-7ff0fbff1b53_channel',
        token: 'user_ee1cda0f-8a8b-4257-bfea-7ff0fbff1b53_channel',
    }
};