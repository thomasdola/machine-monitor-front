import { combineReducers } from 'redux';
import {failed as OPERATION_FAILED, successful as OPERATION_SUCCESSFUL, started as OPERATION_STARTED, timeout as OPERATION_TIME_OUT} from './Operation';
import {profile as machineProfile, loading as loadingMachineProfile, failed as loadingMachineProfileFailed} from './MachineProfile';
import {logs as machineLogs, loading as loadingMachineLogs, failed as loadingMachineLogsFailed} from './MachineLogs';
import {issues as machineIssues, loading as loadingMachineIssues, failed as loadingMachineIssuesFailed} from './MachineIssues';
import {deployments as machineDeployments, loading as loadingMachineDeployments, failed as loadingMachineDeploymentsFailed} from './MachineDeployments';
import {list as machines, loading as loadingMachines, failed as loadingMachinesFailed} from './Machines';
import {user as authUser, authenticated as userAuthenticated, locked as sessionLocked, loadingLogin, loadingLogout} from './Auth';
import {socket, userChannel} from './Socket';

export default combineReducers({
    socket, userChannel,
    OPERATION_FAILED, OPERATION_SUCCESSFUL, OPERATION_STARTED, OPERATION_TIME_OUT,
    authUser, userAuthenticated, sessionLocked, loadingLogin, loadingLogout,
    loadingMachineProfile, machineProfile, loadingMachineProfileFailed,
    machineLogs, loadingMachineLogs, loadingMachineLogsFailed,
    loadingMachines, machines, loadingMachinesFailed,
    loadingMachineIssues, loadingMachineIssuesFailed, machineIssues,
    loadingMachineDeployments, loadingMachineDeploymentsFailed, machineDeployments
});