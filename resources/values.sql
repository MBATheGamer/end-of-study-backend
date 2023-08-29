-- add roles
insert into roles values (1, "admin");
insert into roles values (2, "teacher");
insert into roles values (3, "student");
insert into roles values (4, "guest");

-- add permissions
insert into permissions values (1, "view_users");
insert into permissions values (2, "edit_users");
insert into permissions values (3, "view_roles");
insert into permissions values (4, "edit_roles");
insert into permissions values (5, "view_permissions");
insert into permissions values (6, "edit_permissions");
insert into permissions values (7, "view_departments");
insert into permissions values (8, "edit_departments");
insert into permissions values (9, "view_classrooms");
insert into permissions values (10, "edit_classrooms");
insert into permissions values (11, "view_subjects");
insert into permissions values (12, "edit_subjects");

-- add role_permissions
-- admin
insert into role_permissions values (1, 1);
insert into role_permissions values (1, 2);
insert into role_permissions values (1, 3);
insert into role_permissions values (1, 4);
insert into role_permissions values (1, 5);
insert into role_permissions values (1, 6);
insert into role_permissions values (1, 7);
insert into role_permissions values (1, 8);
insert into role_permissions values (1, 9);
insert into role_permissions values (1, 10);
insert into role_permissions values (1, 11);
insert into role_permissions values (1, 12);
-- teacher
insert into role_permissions values (2, 1);
insert into role_permissions values (2, 3);
insert into role_permissions values (2, 5);
insert into role_permissions values (2, 7);
insert into role_permissions values (2, 9);
insert into role_permissions values (2, 11);
insert into role_permissions values (2, 12);
-- student
insert into role_permissions values (3, 1);
insert into role_permissions values (3, 3);
insert into role_permissions values (3, 5);
insert into role_permissions values (3, 7);
insert into role_permissions values (3, 9);
insert into role_permissions values (3, 11);