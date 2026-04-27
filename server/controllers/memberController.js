import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Create a new member in the group
export const createMember = async (req, res) => {
  const { fullName, mobileNumber, role } = req.body;
  const groupId = req.user.groupId; // From authMiddleware

  if (!groupId) {
    return res.status(400).json({ error: 'Permission denied. Group ID missing.' });
  }

  try {
    const newMember = await prisma.member.create({
      data: {
        fullName,
        mobileNumber,
        role: role || 'MEMBER',
        groupId: groupId
      }
    });

    res.status(201).json({ message: 'Member added successfully.', member: newMember });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Mobile number already registered.' });
    }
    res.status(500).json({ error: 'Failed to add member.' });
  }
};

// 2. Get all members of the group
export const getGroupMembers = async (req, res) => {
  const groupId = req.user.groupId;

  try {
    const members = await prisma.member.findMany({
      where: { groupId },
      orderBy: { fullName: 'asc' }
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members.' });
  }
};

// 3. Get group details for the header
export const getGroupInfo = async (req, res) => {
  const groupId = req.user.groupId;

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: { name: true }
    });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch group info.' });
  }
};
