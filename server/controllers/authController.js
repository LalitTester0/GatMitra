import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

// 1. Request OTP
export const requestOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const member = await prisma.member.findUnique({ where: { mobileNumber } });
    
    if (!member) {
      return res.status(404).json({ error: 'Mobile number not registered.' });
    }

    // Generate a 4-digit mock OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

    await prisma.member.update({
      where: { id: member.id },
      data: { otpCode: otp, otpExpiresAt: expiry }
    });

    // MOCK SMS SENDING
    console.log(`\n================================`);
    console.log(`📱 MOCK SMS: OTP for ${mobileNumber} is ${otp}`);
    console.log(`================================\n`);

    res.json({ message: 'OTP sent successfully (Check server console for mock SMS).' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to request OTP.' });
  }
};

// 2. Verify OTP and login
export const verifyOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
    const member = await prisma.member.findUnique({ where: { mobileNumber } });
    if (!member || !member.otpCode) {
      return res.status(400).json({ error: 'Invalid operation.' });
    }

    if (member.otpExpiresAt < new Date()) {
      return res.status(401).json({ error: 'OTP has expired.' });
    }

    if (member.otpCode !== otp) {
      return res.status(401).json({ error: 'Incorrect OTP.' });
    }

    // OTP is valid. Clear it out and sign JWT
    await prisma.member.update({
      where: { id: member.id },
      data: { otpCode: null, otpExpiresAt: null }
    });

    const token = jwt.sign(
      { 
        id: member.id, 
        role: member.role,
        groupId: member.groupId,
        isSuperAdmin: false 
      },
      JWT_SECRET,
      { expiresIn: '30d' } // Keep app session alive for 30 days
    );

    res.json({ 
      token, 
      message: 'Login successful.',
      member: {
        id: member.id,
        fullName: member.fullName,
        role: member.role,
        groupId: member.groupId
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Verification failed.' });
  }
};
