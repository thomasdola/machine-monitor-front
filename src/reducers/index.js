import { combineReducers } from 'redux';
import {failed as OPERATION_FAILED, successful as OPERATION_SUCCESSFUL} from './Operation';
import {info as MRWInfo, loading as loadingInfo, failed as loadingInfoFailed} from './MRWInfo';
import {logs as MRWLogs, loading as loadingLogs, failed as loadingLogsFailed} from './MRWLogs';
import {issues as MRWIssues, loading as loadingIssues, failed as loadingIssuesFailed} from './MRWIssues';
import {deployments as MRWDeployments, loading as loadingDeployments, failed as loadingDeploymentsFailed} from './MRWDeployments';
import {list as MRWs, loading as loadingMRWs, failed as loadingMRWsFailed} from './MRWs';
import {user as authUser, authenticated as userAuthenticated, locked as sessionLocked, loadingLogin, loadingLogout} from './Auth';

export default combineReducers({
    OPERATION_FAILED, OPERATION_SUCCESSFUL,
    authUser, userAuthenticated, sessionLocked, loadingLogin, loadingLogout,
    loadingInfo, MRWInfo, loadingInfoFailed,
    loadingLogs, MRWLogs, loadingLogsFailed,
    loadingMRWs, MRWs, loadingMRWsFailed,
    loadingIssues, loadingIssuesFailed, MRWIssues,
    loadingDeployments, loadingDeploymentsFailed, MRWDeployments
});