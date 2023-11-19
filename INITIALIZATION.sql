-- CREATE ADMIN USER
INSERT INTO user_master ("UserId", "Name", "Contact", "DOB", "Email", "UserName", "Password", "SecurityLevel", "DateCreated") VALUES ((SELECT  nextval('master_db_id_sequence') FROM dual), 'admin', '0000000000', CURRENT_DATE, 'admin@admin', 'admin', PGP_SYM_ENCRYPT('admin' , 'AES_KEY'), '0' , CURRENT_DATE);

-- CREATE SECURITY PERMISSIONS
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_ALL_TASK');
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_ALL_USER');
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_ALL_PROJECT');
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_NO_ACCESS');
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_ALL_REPORT');
INSERT INTO public.permissions ("PermissionId", "AccessPermissions") VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'PERM_ALL_ORG_SECURITY');

-- CREATE ADMIN ROLE
INSERT INTO role_master ("RoleId", "RoleName", "SecurityLevel" , "Permissions") VALUES ((SELECT  nextval('master_db_id_sequence') FROM dual) , 'ADMIN' , '0' , 'PERM_ALL_TASK,PERM_ALL_USER,PERM_ALL_PROJECT,PERM_NO_ACCESS,PERM_ALL_REPORT,PERM_ALL_ORG_SECURITY');

-- CREATE BASE PROJECT
INSERT INTO public.project_master ("ProjectId", "ProjectName", "DateCreated") VALUES(0, 'Resource_Bench', CURRENT_DATE);
 
-- CREATE BASE WORKFLOW
INSERT INTO public.workflow (workflowid, workflowstatus) VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'New');
INSERT INTO public.workflow (workflowid, workflowstatus) VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'In_Progress');
INSERT INTO public.workflow (workflowid, workflowstatus) VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'Completed');
INSERT INTO public.workflow (workflowid, workflowstatus) VALUES((SELECT  nextval('master_db_id_sequence') FROM dual), 'Deleted');
