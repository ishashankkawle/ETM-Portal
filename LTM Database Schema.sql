
-- DROP SEQUENCE public.master_db_id_sequence;

CREATE SEQUENCE public.master_db_id_sequence
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public.dual definition












-- DROP TABLE public.dual;

CREATE TABLE public.dual (
	dummy_column int4 NULL
);


-- public.module_master definition

-- Drop table

-- DROP TABLE public.module_master;

CREATE TABLE public.module_master (
	"ModuleId" numeric NOT NULL,
	"Module" varchar(50) NOT NULL,
	"DateCreated" timestamp NULL,
	CONSTRAINT "MM_PR_KEY" PRIMARY KEY ("ModuleId", "Module")
);


-- public.module_project_map definition

-- Drop table

-- DROP TABLE public.module_project_map;

CREATE TABLE public.module_project_map (
	"ModuleId" numeric NULL,
	"ProjectId" numeric NULL
);


-- public.permissions definition

-- Drop table

-- DROP TABLE public.permissions;

CREATE TABLE public.permissions (
	"PermissionId" varchar NULL,
	"AccessPermissions" varchar NULL
);


-- public.priority_master definition

-- Drop table

-- DROP TABLE public.priority_master;

CREATE TABLE public.priority_master (
	"PriorityId" numeric NOT NULL,
	"Priority" varchar(50) NOT NULL,
	"DateCreated" timestamp NULL,
	CONSTRAINT "PM_PR_KEY" PRIMARY KEY ("PriorityId", "Priority")
);


-- public.priority_project_map definition

-- Drop table

-- DROP TABLE public.priority_project_map;

CREATE TABLE public.priority_project_map (
	"PriorityId" numeric NULL,
	"ProjectId" numeric NULL
);


-- public.project_master definition

-- Drop table

-- DROP TABLE public.project_master;

CREATE TABLE public.project_master (
	"ProjectId" numeric NULL,
	"ProjectName" varchar NULL,
	"DateCreated" timestamp NULL
);


-- public.role_master definition

-- Drop table

-- DROP TABLE public.role_master;

CREATE TABLE public.role_master (
	"RoleId" numeric NULL,
	"RoleName" varchar(50) NULL,
	"SecurityLevel" numeric NULL,
	"Permissions" text NOT NULL DEFAULT '[PERM_NO_ACCESS]'::text
);


-- public.sprint_master definition

-- Drop table

-- DROP TABLE public.sprint_master;

CREATE TABLE public.sprint_master (
	"SprintId" varchar NULL,
	"Sprint" varchar NULL,
	"StartDate" timestamp NULL,
	"EndDate" timestamp NULL
);


-- public.sprint_project_map definition

-- Drop table

-- DROP TABLE public.sprint_project_map;

CREATE TABLE public.sprint_project_map (
	"SprintId" varchar NULL,
	"ProjectId" varchar NULL
);


-- public.task_master definition

-- Drop table

-- DROP TABLE public.task_master;

CREATE TABLE public.task_master (
	"TaskId" numeric NULL,
	"Description" text NULL,
	"DateCreated" timestamp NULL,
	"Sprint" varchar NULL DEFAULT 'Sprint 000'::character varying,
	"Module" varchar(50) NULL,
	"Order" varchar(50) NULL,
	"Priority" varchar(50) NULL,
	"Title" varchar(50) NULL,
	"Type" varchar(50) NULL,
	"TaskStatus" varchar(50) NULL DEFAULT 'New'::character varying,
	"Assigner" varchar NULL,
	"Owner" varchar NULL,
	"ProjectId" numeric NULL,
	CONSTRAINT "TSM_UK_TID" UNIQUE ("TaskId")
);


-- public.type_master definition

-- Drop table

-- DROP TABLE public.type_master;

CREATE TABLE public.type_master (
	"TypeId" numeric NOT NULL,
	"Type" varchar(50) NOT NULL,
	"DateCreated" timestamp NULL,
	CONSTRAINT "TM_PR_KEY" PRIMARY KEY ("TypeId", "Type")
);


-- public.type_project_map definition

-- Drop table

-- DROP TABLE public.type_project_map;

CREATE TABLE public.type_project_map (
	"TypeId" numeric NULL,
	"ProjectId" numeric NULL
);


-- public.user_master definition

-- Drop table

-- DROP TABLE public.user_master;

CREATE TABLE public.user_master (
	"Contact" varchar(50) NOT NULL,
	"DateCreated" timestamp NULL,
	"DOB" timestamp NULL,
	"Email" varchar(50) NULL,
	"Name" varchar(50) NULL,
	"Password" varchar(500) NOT NULL,
	"UserName" varchar(500) NOT NULL,
	"UserId" numeric NULL,
	"SecurityLevel" numeric NULL,
	"RoleId" varchar NULL,
	CONSTRAINT "USR_UK_CON" UNIQUE ("Contact"),
	CONSTRAINT "USR_UK_EML" UNIQUE ("Email"),
	CONSTRAINT "USR_UK_UN" UNIQUE ("UserName")
);


-- public.user_project_map definition

-- Drop table

-- DROP TABLE public.user_project_map;

CREATE TABLE public.user_project_map (
	"UserId" varchar NOT NULL,
	"ProjectId" varchar NOT NULL
);


-- public.workflow definition

-- Drop table

-- DROP TABLE public.workflow;

CREATE TABLE public.workflow (
	workflowid int4 NULL,
	workflowstatus varchar(50) NULL
);














-- public.view_moduleprojectmap source

CREATE OR REPLACE VIEW public.view_moduleprojectmap
AS SELECT mpm."ModuleId",
    mpm."ProjectId",
    mm."Module"
   FROM ( SELECT module_project_map."ModuleId",
            module_project_map."ProjectId"
           FROM module_project_map) mpm
     JOIN ( SELECT module_master."Module",
            module_master."ModuleId"
           FROM module_master) mm ON mpm."ModuleId"::text = mm."ModuleId"::text
     JOIN ( SELECT project_master."ProjectId",
            project_master."ProjectName"
           FROM project_master) pm ON mpm."ProjectId"::text = pm."ProjectId"::text;


-- public.view_priorityprojectmap source

CREATE OR REPLACE VIEW public.view_priorityprojectmap
AS SELECT ppm."PriorityId",
    ppm."ProjectId",
    pm."Priority"
   FROM ( SELECT priority_project_map."PriorityId",
            priority_project_map."ProjectId"
           FROM priority_project_map) ppm
     JOIN ( SELECT priority_master."PriorityId",
            priority_master."Priority"
           FROM priority_master) pm ON ppm."PriorityId"::text = pm."PriorityId"::text;


-- public.view_projectlist source

CREATE OR REPLACE VIEW public.view_projectlist
AS SELECT pm."ProjectId",
    pm."ProjectName",
    upm."UserId",
    um."Name"
   FROM ( SELECT project_master."ProjectId",
            project_master."ProjectName"
           FROM project_master) pm
     JOIN ( SELECT user_project_map."UserId",
            user_project_map."ProjectId"
           FROM user_project_map) upm ON pm."ProjectId"::text = upm."ProjectId"::text
     JOIN ( SELECT user_master."UserId",
            user_master."Name"
           FROM user_master) um ON upm."UserId"::text = um."UserId"::text;


-- public.view_sprintprojectmap source

CREATE OR REPLACE VIEW public.view_sprintprojectmap
AS SELECT spm."SprintId",
    spm."ProjectId",
    sm."Sprint",
    sm."StartDate",
    sm."EndDate"
   FROM ( SELECT sprint_project_map."SprintId",
            sprint_project_map."ProjectId"
           FROM sprint_project_map) spm
     JOIN ( SELECT sprint_master."Sprint",
            sprint_master."SprintId",
            sprint_master."StartDate",
            sprint_master."EndDate"
           FROM sprint_master) sm ON spm."SprintId"::text = sm."SprintId"::text
     JOIN ( SELECT project_master."ProjectId",
            project_master."ProjectName"
           FROM project_master) pm ON spm."ProjectId"::text = pm."ProjectId"::text;


-- public.view_taskmaster source

CREATE OR REPLACE VIEW public.view_taskmaster
AS SELECT tm."TaskId",
    tm."Assigner" AS "TaskAssigner",
    tm."Description",
    tm."DateCreated",
    tm."Module",
    tm."Order",
    tm."Owner" AS "TaskOwner",
    tm."Priority",
    tm."Title",
    tm."Type",
    tm."TaskStatus",
    um."Name" AS "AssignerName",
    um2."Name" AS "OwnerName",
    tm."ProjectId",
    pm."ProjectName" AS "Project",
    sm."SprintName",
    sm."EndDate",
    sm."SprintId"
   FROM task_master tm
     JOIN ( SELECT user_master."UserId",
            user_master."Name"
           FROM user_master) um ON tm."Assigner"::text = um."UserId"::text
     JOIN ( SELECT user_master."UserId",
            user_master."Name"
           FROM user_master) um2 ON tm."Owner"::text = um2."UserId"::text
     JOIN ( SELECT project_master."ProjectId",
            project_master."ProjectName"
           FROM project_master) pm ON tm."ProjectId"::text = pm."ProjectId"::text
     JOIN ( SELECT sprint_master."SprintId",
            sprint_master."Sprint" AS "SprintName",
            sprint_master."EndDate"
           FROM sprint_master) sm ON tm."Sprint"::text = sm."SprintName"::text;


-- public.view_typeprojectmap source

CREATE OR REPLACE VIEW public.view_typeprojectmap
AS SELECT tpm."TypeId",
    tpm."ProjectId",
    tm."Type"
   FROM ( SELECT type_project_map."TypeId",
            type_project_map."ProjectId"
           FROM type_project_map) tpm
     JOIN ( SELECT type_master."TypeId",
            type_master."Type"
           FROM type_master) tm ON tpm."TypeId"::text = tm."TypeId"::text;


-- public.view_usermaster source

CREATE OR REPLACE VIEW public.view_usermaster
AS SELECT um."Contact",
    um."DateCreated",
    um."DOB",
    um."Email",
    um."UserName",
    um."Name",
    um."UserId",
    um."RoleId",
    um."SecurityLevel",
    rm."Permissions",
    rm."RoleName"
   FROM user_master um
     JOIN ( SELECT role_master."RoleId",
            role_master."RoleName",
            role_master."Permissions"
           FROM role_master) rm ON um."RoleId"::text = rm."RoleId"::text;


-- public.view_userprojectmap source

CREATE OR REPLACE VIEW public.view_userprojectmap
AS SELECT upm."UserId",
    um."Name",
    upm."ProjectId",
    um."SecurityLevel",
    pm."ProjectName",
    rm."RoleName"
   FROM ( SELECT user_project_map."UserId",
            user_project_map."ProjectId"
           FROM user_project_map) upm
     JOIN ( SELECT user_master."UserId",
            user_master."Name",
            user_master."SecurityLevel"
           FROM user_master) um ON upm."UserId"::text = um."UserId"::text
     JOIN ( SELECT project_master."ProjectId",
            project_master."ProjectName"
           FROM project_master) pm ON upm."ProjectId"::text = pm."ProjectId"::text
     JOIN ( SELECT role_master."SecurityLevel",
            role_master."RoleName"
           FROM role_master) rm ON um."SecurityLevel"::text = rm."SecurityLevel"::text;



