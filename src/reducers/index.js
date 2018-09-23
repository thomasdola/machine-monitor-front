import { combineReducers } from 'redux';
import {failed as OPERATION_FAILED, successful as OPERATION_SUCCESSFUL, started as OPERATION_STARTED, timeout as OPERATION_TIME_OUT} from './Operation';
import {profile as machineProfile, loading as loadingMachineProfile, failed as loadingMachineProfileFailed} from './MachineProfile';
import {logs as machineLogs, loading as loadingMachineLogs, failed as loadingMachineLogsFailed} from './MachineLogs';
import {issues as machineIssues, loading as loadingMachineIssues, failed as loadingMachineIssuesFailed} from './MachineIssues';
import {deployments as machineDeployments, loading as loadingMachineDeployments, failed as loadingMachineDeploymentsFailed} from './MachineDeployments';
import {list as machines, loading as loadingMachines, failed as loadingMachinesFailed} from './Machines';
import {user as authUser, authenticated as userAuthenticated, locked as sessionLocked, loadingLogin, loadingLogout} from './Auth';
import {actions, loading as loadingActions} from './actions';
import {entities, loading as loadingEntities} from './entities';
import {pages, loading as loadingPages} from './pages';
import {logs as systemLogs, loading as loadingSystemLogs, pagination as systemLogsPagination, exporting as exportingSystemLogs} from './AuditTrail';
import {policies, loading as loadingPolicies, adding as addingPolicy, editing as editingPolicy, deleting as deletingPolicy} from './policies';
import {roles, pagination as rolesPagination, deleting as deletingRole, editing as editingRole, adding as addingRole, loading as loadingRoles} from './roles';
import {users, pagination as usersPagination, loading as loadingUsers, adding as addingUser, editing as editingUser, deleting as deletingUser} from './users';
import {regions, loading as loadingRegions} from './Regions';
import {districts, loading as loadingDistricts} from './Districts';
import {centers, loading as loadingCenters, pagination as centersPagination, deleting as deletingCenter, editing as editingCenter, adding as addingCenter} from './centers';
import {region as regionFilter, district as districtFilter, page as pageFilter, role as roleFilter, entity as entityFilter} from './filter';

import {socket, userChannel} from './Socket';

export default combineReducers({
    socket, userChannel,
    OPERATION_FAILED, OPERATION_SUCCESSFUL, OPERATION_STARTED, OPERATION_TIME_OUT,
    authUser, userAuthenticated, sessionLocked, loadingLogin, loadingLogout,
    loadingMachineProfile, machineProfile, loadingMachineProfileFailed,
    machineLogs, loadingMachineLogs, loadingMachineLogsFailed,
    loadingMachines, machines, loadingMachinesFailed,
    loadingMachineIssues, loadingMachineIssuesFailed, machineIssues,
    loadingMachineDeployments, loadingMachineDeploymentsFailed, machineDeployments,
    actions, loadingActions,
    entities, loadingEntities,
    pages, loadingPages,
    policies, loadingPolicies, addingPolicy, editingPolicy, deletingPolicy,
    roles, rolesPagination, deletingRole, editingRole, addingRole, loadingRoles,
    users, usersPagination, loadingUsers, addingUser, editingUser, deletingUser,
    systemLogs, loadingSystemLogs, systemLogsPagination, exportingSystemLogs,
    regions, loadingRegions,
    districts, loadingDistricts,
    centers, loadingCenters, centersPagination, deletingCenter, editingCenter, addingCenter,
    regionFilter, districtFilter, pageFilter, roleFilter, entityFilter
});