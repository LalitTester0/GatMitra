-- GatMitra Database Seed Data
-- Seed Roles and Permissions, Mapping, and Initial Admins / Bachat Gats

-- 1. Insert Roles
INSERT INTO roles (id, name, description) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'SUPER_ADMIN', 'Super Administrator with full portal access'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'ADMIN', 'Bachat Gat President/Secretary Admin'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'MEMBER', 'General Bachat Gat Member')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Permissions
INSERT INTO permissions (id, name, description) VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'READ_DASHBOARD', 'View metrics dashboards'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'MANAGE_USERS', 'Create, update, delete system users'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'MANAGE_ROLES', 'View and edit role mapping configuration'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', 'CREATE_BACHATGAT', 'Register a new Bachat Gat'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', 'READ_BACHATGAT', 'View registered Bachat Gat groups'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', 'UPDATE_BACHATGAT', 'Edit Bachat Gat group parameters'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a07', 'DELETE_BACHATGAT', 'Soft-delete a Bachat Gat'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a08', 'CREATE_MEMBER', 'Add a new member to a Bachat Gat'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a09', 'READ_MEMBER', 'View list of Bachat Gat members'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'UPDATE_MEMBER', 'Update details of a member'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'DELETE_MEMBER', 'Soft-delete a member'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'READ_AUDIT', 'View system login audits and admin activity logs'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'MANAGE_NOTIFICATIONS', 'View templates and push system alerts')
ON CONFLICT (name) DO NOTHING;

-- 3. Map Permissions to Roles
-- SUPER_ADMIN gets all permissions
INSERT INTO role_permission_mapping (role_id, permission_id)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', id FROM permissions
ON CONFLICT DO NOTHING;

-- ADMIN gets most permissions except role management
INSERT INTO role_permission_mapping (role_id, permission_id)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', id FROM permissions
WHERE name NOT IN ('MANAGE_ROLES', 'MANAGE_USERS')
ON CONFLICT DO NOTHING;

-- MEMBER gets read permissions
INSERT INTO role_permission_mapping (role_id, permission_id)
SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', id FROM permissions
WHERE name IN ('READ_DASHBOARD', 'READ_BACHATGAT', 'READ_MEMBER')
ON CONFLICT DO NOTHING;

-- 4. Insert Seed Users
-- Password is 'admin123' bcrypt hash: $2a$10$8.4F.jK.uPzQ2pXF.X7OaednLp3gI.FjK.wZ2k.m/FjK.7/k0.k2 (standard BCrypt, or Spring compatible)
-- BCrypt hash for "password123": $2a$10$r8O9D.2/3.N5iQ/L5K.4feXJb3c6lP.9P7s.785zGZJ/78v/7.jqy
INSERT INTO users (id, username, password_hash, phone_number, is_active, is_deleted, created_by) VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d11', 'superadmin', '$2a$10$r8O9D.2/3.N5iQ/L5K.4feXJb3c6lP.9P7s.785zGZJ/78v/7.jqy', '+919876543210', TRUE, FALSE, 'system'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d22', 'admin_durga', '$2a$10$r8O9D.2/3.N5iQ/L5K.4feXJb3c6lP.9P7s.785zGZJ/78v/7.jqy', '+919876543211', TRUE, FALSE, 'system'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d33', 'member_anita', '$2a$10$r8O9D.2/3.N5iQ/L5K.4feXJb3c6lP.9P7s.785zGZJ/78v/7.jqy', '+919876543212', TRUE, FALSE, 'system')
ON CONFLICT (username) DO NOTHING;

-- 5. Map Users to Roles
INSERT INTO user_roles (user_id, role_id) VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33')
ON CONFLICT DO NOTHING;

-- 6. Insert Seed Bachat Gats (Self-Help Groups)
INSERT INTO bachat_gat (id, name, registration_number, established_date, description, monthly_savings_amount, is_active, is_deleted, created_by) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380e11', 'Durga Mahila Bachat Gat', 'BG-2023-0091', '2023-01-15', 'Empowering rural women through financial inclusion and minor businesses.', 500.00, TRUE, FALSE, 'superadmin'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380e22', 'Savitribai Phule Self-Help Group', 'BG-2024-0104', '2024-03-10', 'Primary focus on micro-farming loans and education support.', 1000.00, TRUE, FALSE, 'superadmin')
ON CONFLICT (registration_number) DO NOTHING;

-- 7. Insert Seed Members
INSERT INTO members (id, bachat_gat_id, user_id, first_name, last_name, phone_number, join_date, status, is_deleted, created_by) VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380f11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380e11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d22', 'Durga', 'Devi', '+919876543211', '2023-01-15', 'ACTIVE', FALSE, 'superadmin'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380f22', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380e11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380d33', 'Anita', 'Shinde', '+919876543212', '2023-02-01', 'ACTIVE', FALSE, 'admin_durga')
ON CONFLICT DO NOTHING;

-- 8. Insert Notification Templates
INSERT INTO notification_templates (id, name, type, template_content, description) VALUES
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'OTP_LOGIN', 'OTP', 'Hello, your GatMitra OTP verification code is {otp}. This code is valid for 5 minutes. Do not share it with anyone.', 'Template used for logging in via WhatsApp/SMS OTP authentication'),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'MONTHLY_SAVINGS_REMINDER', 'TRANSACTION', 'Dear {name}, this is a gentle reminder to submit your monthly Bachat Gat savings contribution of INR {amount} for group {groupName}.', 'Template for monthly contribution reminders')
ON CONFLICT (name) DO NOTHING;
