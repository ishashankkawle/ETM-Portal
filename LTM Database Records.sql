INSERT INTO public.dual (dummy_column) VALUES
	 (0);
INSERT INTO public.module_master ("ModuleId","Module","DateCreated") VALUES
	 (494,'ABC','2023-12-02 00:00:00');
INSERT INTO public.module_project_map ("ModuleId","ProjectId") VALUES
	 (494,479);
INSERT INTO public.permissions ("PermissionId","AccessPermissions") VALUES
	 ('396','PERM_ALL_TASK'),
	 ('397','PERM_ALL_USER'),
	 ('398','PERM_ALL_PROJECT'),
	 ('403','PERM_NO_ACCESS'),
	 ('404','PERM_ALL_REPORT'),
	 ('405','PERM_ALL_ORG_SECURITY');
INSERT INTO public.priority_master ("PriorityId","Priority","DateCreated") VALUES
	 (497,'High','2023-12-02 00:00:00'),
	 (498,'Low','2023-12-02 00:00:00');
INSERT INTO public.priority_project_map ("PriorityId","ProjectId") VALUES
	 (497,479),
	 (498,479);
INSERT INTO public.project_master ("ProjectId","ProjectName","DateCreated") VALUES
	 (0,'Resource_Bench','2023-04-28 00:00:00'),
	 (479,'Laniak','2023-11-11 00:00:00');
INSERT INTO public.role_master ("RoleId","RoleName","SecurityLevel","Permissions") VALUES
	 (0,'ADMIN',0,'PERM_ALL_TASK,PERM_ALL_USER,PERM_ALL_PROJECT,PERM_NO_ACCESS,PERM_ALL_REPORT,PERM_ALL_ORG_SECURITY'),
	 (469,'Lower Role',2,'PERM_ALL_TASK'),
	 (468,'Higher Role',1,'PERM_ALL_PROJECT,PERM_ALL_TASK'),
	 (480,'No Access',3,'PERM_NO_ACCESS');
INSERT INTO public.sprint_master ("SprintId","Sprint","StartDate","EndDate") VALUES
	 ('01','Sprint 2022-01','2023-05-01 00:00:00','2023-12-31 00:00:00'),
	 ('394','Sprint 02','2023-01-01 00:00:00','2022-04-30 00:00:00'),
	 ('395','Sprint 03','2022-06-01 00:00:00','2022-12-31 00:00:00'),
	 ('484',NULL,'2023-11-24 00:00:00','2023-12-10 00:00:00'),
	 ('485',NULL,'2023-11-24 00:00:00','2023-12-10 00:00:00'),
	 ('486',NULL,'2023-11-22 00:00:00','2023-11-25 00:00:00'),
	 ('487','httdf','2023-11-09 00:00:00','2023-12-09 00:00:00'),
	 ('488','httdf','2023-11-09 00:00:00','2023-12-09 00:00:00');
INSERT INTO public.sprint_project_map ("SprintId","ProjectId") VALUES
	 ('01','479'),
	 ('394','479'),
	 ('395','479'),
	 ('484','479'),
	 ('485','479'),
	 ('486','479'),
	 ('487','479'),
	 ('488','479');
INSERT INTO public.task_master ("TaskId","Description","DateCreated","Sprint","Module","Order","Priority","Title","Type","TaskStatus","Assigner","Owner","ProjectId") VALUES
	 (503,'desc','2023-12-09 00:00:00','Sprint 03','ABC',NULL,'Low','Test task','Enhancement','In_Progress','470','472',479),
	 (508,'fka uskhf usekh gukhsehg seh gkhseuhgs hekbs ','2024-01-01 00:00:00','Sprint 2022-01','ABC',NULL,'High','se hgkuhse kughskueh gkushe ukgh sue ','Enhancement','Delete','0','470',479),
	 (499,'Update Gitbook documentation to support latest product updates','2023-12-02 00:00:00','Sprint 03','ABC',NULL,'High','Update Gitbook Docs','Enhancement','Delete','0','470',479),
	 (502,'Update Gitbook docs to support latest product updates','2023-12-02 00:00:00','Sprint 03','ABC',NULL,'High','Update Gitbook Docs','Enhancement','In_Progress','0','470',479);
INSERT INTO public.type_master ("TypeId","Type","DateCreated") VALUES
	 (495,'Enhancement','2023-12-02 00:00:00'),
	 (496,'Bug','2023-12-02 00:00:00');
INSERT INTO public.type_project_map ("TypeId","ProjectId") VALUES
	 (495,479),
	 (496,479);
INSERT INTO public.user_master ("Contact","DateCreated","DOB","Email","Name","Password","UserName","UserId","SecurityLevel","RoleId") VALUES
	 ('1234','2023-11-11 00:00:00','2023-11-01 00:00:00','hu@email.com','hu-password:asdf','YXNkZg==','hu@email.com',470,1,'468'),
	 ('12345','2023-11-11 00:00:00','2023-11-01 00:00:00','lu@email.com','lu-password:asdf','YXNkZg==','lu@email.com',472,2,'469'),
	 ('0000000000','2023-11-11 00:00:00','2023-11-11 00:00:00','admin@admin.com','admin','YWRtaW4=','admin@admin.com',0,0,'0'),
	 ('121212','2023-11-14 00:00:00','2023-11-09 00:00:00','na@email.com','No Access User','YXNkZg==','na@email.com',483,1,'468'),
	 ('1312312312','2023-12-02 00:00:00','2023-12-13 00:00:00','nauser2@email.com','No Access User 2','YXNkZg==','nauser2@email.com',500,3,'480'),
	 ('234234','2024-01-01 00:00:00','1972-12-12 00:00:00','na2@email.com','NA 2','YXNkZg==','na2@email.com',509,3,'480');
INSERT INTO public.user_project_map ("UserId","ProjectId") VALUES
	 ('470','0'),
	 ('472','0'),
	 ('470','479'),
	 ('0','479'),
	 ('483','0'),
	 ('0','0'),
	 ('500','0'),
	 ('472','479'),
	 ('509','0');
INSERT INTO public.workflow (workflowid,workflowstatus) VALUES
	 (28,'New'),
	 (29,'In_Progress'),
	 (30,'Completed'),
	 (31,'Deleted');
