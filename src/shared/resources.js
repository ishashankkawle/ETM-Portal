let res = {
  "FILE_NAME": "Task.xlsx",
  "SHEET_NAME": "TaskSheet",
  "FILE_PATH": "C:/Users/Shashank/Desktop/",
  "STR_MODULE": "Module",
  "STR_DATE": "Date",
  "STR_TASK": "Task",
  "STR_DESCRIPTION": "Description",
  "STR_IOB": "Issue or Bugs",
  
  "USERDATA": {
      "STR_USERID": "",
      "STR_NAME": "",
      "STR_SECURITY_LEVEL": "",
      "STR_ROLENAME": "",
      "STR_ROLEID": "",
      "STR_PERMISSIONS" : "",
      "STR_EMAIL" : "",
      "STR_CONTACT" : "",
      "STR_DOB" : ""
  },
  //-------------------------------------------------------------------------
  // "STR_USERID": "250",
  // "STR_USERNAME": "Mandar",
  // "STR_SECURITY_LEVEL": "5",
  // "STR_ROLENAME": "Master",
  // "STR_ROLEID": "3",

  // "STR_USERID": "240",
  // "STR_USERNAME": "Shashank",
  // "STR_SECURITY_LEVEL": "0",

  "STR_USERID": "383",
  "STR_USERNAME": "testuser2",
  "STR_SECURITY_LEVEL": "5",
  "STR_ROLENAME": "Project Manager",
  "STR_ROLEID": "5",
  //-------------------------------------------------------------------------

  "STR_BLOBDBNAME": "TSSTaskHistory",
  "STR_BLOBDBCOLLECTIONAME": "TSSTaskHistoryCollection",

  "ID_COLUMN_CONFIG": {
    "project_master": "ProjectId",
    "user_master": "UserId",
    "task_master": "TaskId",
    "module_master": "ModuleId",
    "type_master": "TypeId",
    "priority_master": "PriorityId",
  },
  "POPUP_NOTIFICATION_MAP": {
    "type": {
      "ERROR": "alert",
      "WARNING": "warning",
      "SUCCESS": "success",
      "LOADING": "loading"
    }
  },
  "TASKDATA_TABLE": {},
  "TASKVERIFICATION_SLFCOMMIT_TABLE": {},
  "TASKVERIFICATION_SLFDELETE_TABLE": {},
  "TASKVERIFICATION_RESOURCEUTILIZATION_TABLE": {},
  "TASKVERIFICATION_ASSIGNEDTASK_TABLE": {},

  "WORKFLOW": {
    "STR_WF_NEW": "New",
    "STR_WF_INPROGRESS": "In_Progress",
    "STR_WF_SELFCOMMIT": "Self_Commit",
    "STR_WF_SELFDELETE": "Self_Delete",
    "STR_WF_COMPLETE": "Complete",
    "STR_WF_DELETE": "Delete",
  },

  "DEFAULTS" : {
    "STR_PROJECT_ID" : "0",
    "STR_ROLE_ID" : "0",
    "STR_USER_ID" : "0",
    "STR_ACCESS" : "PERM_NO_ACCESS"
  },

  "PERMISSIONS" : {
    "NO_ACCESS" : "PERM_NO_ACCESS",
    "PROJECT_ACCESS" : "PERM_ALL_PROJECT",
    "USER_ACCESS" : "PERM_ALL_USER", 
    "TASK_ACCESS" : "PERM_ALL_TASK", 
    "REPPORT_ACCESS" : "PERM_ALL_REPORT",
    "SECURITY_ACCESS" : "PERM_ALL_ORG_SECURITY"
  },

  "STR_BASEPATH": "http://localhost:8081/api",
  "PostgresConnection": "postgres://uuktnljs:Bd-dHv74TDkC-XcBp5Sp-du4xiomzwo1@drona.db.elephantsql.com:5432/uuktnljs",
  "MongoClusterConnection": "mongodb+srv://ets_admin:adreno%40123@tsstaskcluster.8gnng.mongodb.net/ETMHistoryDatabase"

};

export default res;