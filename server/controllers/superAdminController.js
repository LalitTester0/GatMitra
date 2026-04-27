import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

export const superAdminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.superAdmin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin.id, isSuperAdmin: true },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, message: 'Superadmin logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createGroupAndPresident = async (req, res) => {
  // Only accessed by SuperAdmin
  const { groupName, presidentName, presidentMobile } = req.body;

  try {
    // 1. Create the new Bachat Gat Group
    const newGroup = await prisma.group.create({
      data: { name: groupName }
    });

    // 2. Create the initial member assigned as 'ADMIN' (President)
    const president = await prisma.member.create({
      data: {
        groupId: newGroup.id,
        fullName: presidentName,
        mobileNumber: presidentMobile,
        role: 'ADMIN' // Maps to President
      }
    });

    // Mock Messaging Webhook Notification
    // In production, this block will be replaced with an Axios post to Twilio/MSG91/WhatsApp Cloud API
    const loginLink = "http://localhost:5173/member-login";
    const notificationPayload = `Congratulations ${presidentName}!\n${groupName} has been fully registered on the Mahila Bachat Gat platform.\n\nYou have been assigned as the Group President.\nLog in using your registered mobile number (${presidentMobile}) here: ${loginLink}`;
    
    console.log('\n======================================================');
    console.log(`[MOCK WHATSAPP/SMS SENT TO +91${presidentMobile}]`);
    console.log('------------------------------------------------------');
    console.log(notificationPayload);
    console.log('======================================================\n');

    res.status(201).json({ 
      message: 'Group created successfully. Notifications dispatched.', 
      group: newGroup, 
      president 
    });
  } catch (err) {
    if (err.code === 'P2002') { // Unique constraint code
      return res.status(400).json({ error: 'Mobile number already registered in the platform.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create group.' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalGroups, weekGroups, monthGroups] = await Promise.all([
      prisma.group.count(),
      prisma.group.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.group.count({ where: { createdAt: { gte: startOfMonth } } })
    ]);

    res.json({ totalGroups, weekGroups, monthGroups });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

export const getGroups = async (req, res) => {
  try {
    // Fetch all groups along with their President's details (Admin role)
    const groups = await prisma.group.findMany({
      include: {
        members: {
          where: { role: 'ADMIN' },
          select: { fullName: true, mobileNumber: true }
        },
        _count: {
          select: { members: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};
