let res = {
  
  
  "USERDATA": {
      "STR_USERID": "",
      "STR_NAME": "",
      "STR_SECURITY_LEVEL": "",
      "STR_ROLENAME": "",
      "STR_ROLEID": "",
      "STR_PERMISSIONS" : "",
      "STR_EMAIL" : "",
      "STR_CONTACT" : "",
      "STR_DOB" : "",
      "STR_USERNAME" : "",
      "STR_USER_AUTH_COMPLETED" : ""
  },

  "POPUP_NOTIFICATION_MAP": {
    "type": {
      "ERROR": "alert",
      "WARNING": "warning",
      "SUCCESS": "success",
      "LOADING": "loading"
    }
  },

  "VIEW_PERM_MAP" : {
    "Landing" : [],
    "Project" : ["PERM_ALL_PROJECT"],
    "Assets" : ["PERM_ALL_PROJECT"],
    "Dashboard" : ["PERM_ALL_TASK"],
    "Task" : ["PERM_ALL_TASK"],
    "TaskBoard" : ["PERM_ALL_TASK"],
    "Verification" : ["PERM_ALL_TASK"],
    "Insights" : ["PERM_ALL_REPORT"],
    "InsProject" : ["PERM_ALL_REPORT"],
    "InsTask" : ["PERM_ALL_REPORT"],
    "Role" : ["PERM_ALL_ORG_SECURITY"],
    "Security" : ["PERM_ALL_ORG_SECURITY"],
    "UserManagement" : ["PERM_ALL_USER"],
    "User" : ["PERM_ALL_USER"],
    "RoleAssignment" : ["PERM_ALL_USER"],
    "UserDelete" : ["PERM_ALL_USER"],
  },
 
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


  "STR_API_BASEPATH": "http://localhost:8081",
  "PostgresConnection": "postgres://uuktnljs:Bd-dHv74TDkC-XcBp5Sp-du4xiomzwo1@drona.db.elephantsql.com:5432/uuktnljs",
  "MongoClusterConnection": "mongodb+srv://ets_admin:adreno%40123@tsstaskcluster.8gnng.mongodb.net/ETMHistoryDatabase"

};

export default res;