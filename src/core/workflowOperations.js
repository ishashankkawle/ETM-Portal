import res from '../shared/resources';

export function getNextWorkflowStatus(currentWorkflowStatus)
{
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_NEW"]) {
        return res["WORKFLOW"]["STR_WF_INPROGRESS"];
    }
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_INPROGRESS"]) {
        return res["WORKFLOW"]["STR_WF_SELFCOMMIT"];
    }
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_SELFCOMMIT"]) {
        return res["WORKFLOW"]["STR_WF_COMPLETE"];
    }
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_SELFDELETE"]) {
        return res["WORKFLOW"]["STR_WF_DELETE"];
    }
}

export function getPreviousWorkflowStatus(currentWorkflowStatus)
{
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_SELFCOMMIT"]) {
        return res["WORKFLOW"]["STR_WF_INPROGRESS"];
    }
    if (currentWorkflowStatus == res["WORKFLOW"]["STR_WF_SELFDELETE"]) {
        return res["WORKFLOW"]["STR_WF_INPROGRESS"];
    }
}

export function getStartingWorkflowState()
{
    return res["WORKFLOW"]["STR_WF_INPROGRESS"];
}

