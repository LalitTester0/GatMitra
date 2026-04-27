import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "appTitle": "Mahila Bachat Gat",
      "dashboard": "Dashboard",
      "members": "Members",
      "meetings": "Meetings",
      "savings": "Savings",
      "loans": "Loans",
      "passbook": "Passbook",
      "welcomeMsg": "Welcome to the Group Management Platform",
      "welcomeBack": "Welcome Back",
      "enterCredentials": "Please enter your credentials to continue",
      "adminId": "Admin Username",
      "password": "Password",
      "signIn": "Sign In",
      "forgotPassword": "Forgot Password?",
      "loginFailed": "Login failed. Please check your credentials.",
      "loginSuccess": "Logged in successfully!",
      "bannerTitle": "Standardize Bachat Gat Operations",
      "bannerSubtitle": "End-to-end control over your logistics and group operations",
      "bannerF1": "Real-time savings tracking",
      "bannerF2": "Automated loan planning & interest execution",
      "bannerF3": "Eliminate manual bookkeeping",
      "mobileNumber": "Mobile Number",
      "requestOTP": "Request OTP",
      "enterOTP": "Enter OTP",
      "verifyOTP": "Verify OTP",
      "otpSent": "OTP Sent Successfully",
      "invalidMobile": "Mobile number not registered",
      "incorrectOTP": "Incorrect OTP",
      "addGroupMember": "Add Group Member",
      "memberList": "Member List",
      "memberName": "Member Full Name",
      "memberRole": "Role",
      "roleMember": "Member",
      "roleAdmin": "President/Admin",
      "activeMembers": "Active Members",
      "totalSavings": "Total Group Savings"
    }
  },
  mr: {
    translation: {
      "appTitle": "महिला बचत गट",
      "dashboard": "डॅशबोर्ड",
      "members": "सदस्य",
      "meetings": "बैठका",
      "savings": "बचत",
      "loans": "कर्ज",
      "passbook": "पासबुक",
      "welcomeMsg": "गट व्यवस्थापन प्लॅटफॉर्मवर आपले स्वागत आहे",
      "welcomeBack": "परत स्वागत आहे",
      "enterCredentials": "कृपया पुढे जाण्यासाठी तुमची माहिती प्रविष्ट करा",
      "adminId": "प्रशासक वापरकर्तानाव",
      "password": "पासवर्ड",
      "signIn": "साइन इन करा",
      "forgotPassword": "पासवर्ड विसरलात?",
      "loginFailed": "लॉगइन अयशस्वी. कृपया तुमची माहिती तपासा.",
      "loginSuccess": "यशस्वीरित्या लॉग इन केले!",
      "bannerTitle": "बचत गट ऑपरेशन्स प्रमाणित करा",
      "bannerSubtitle": "तुमच्या संपूर्ण गट ऑपरेशन्सवर नियंत्रण",
      "bannerF1": "रिअल-टाइम बचत ट्रॅकिंग",
      "bannerF2": "स्वयंचलित कर्ज नियोजन",
      "bannerF3": "मॅन्युअल बुककीपिंग दूर करा",
      "mobileNumber": "मोबाईल नंबर",
      "requestOTP": "OTP विनंती करा",
      "enterOTP": "OTP प्रविष्ट करा",
      "verifyOTP": "OTP सत्यापित करा",
      "otpSent": "OTP यशस्वीरीत्या पाठवला",
      "invalidMobile": "मोबाईल नंबर नोंदणीकृत नाही",
      "incorrectOTP": "चुकीचा OTP",
      "addGroupMember": "गट सदस्य जोडा",
      "memberList": "सदस्य सूची",
      "memberName": "सदस्याचे पूर्ण नाव",
      "memberRole": "भूमिका",
      "roleMember": "सदस्य",
      "roleAdmin": "अध्यक्ष/प्रशासक",
      "activeMembers": "सक्रिय सदस्य",
      "totalSavings": "एकूण गट बचत"
    }
  },
  hi: {
    translation: {
      "appTitle": "महिला बचत गट",
      "dashboard": "डैशबोर्ड",
      "members": "सदस्य",
      "meetings": "बैठकें",
      "savings": "बचत",
      "loans": "ऋण",
      "passbook": "पासबुक",
      "welcomeMsg": "समूह प्रबंधन मंच में आपका स्वागत है",
      "welcomeBack": "वापसी पर स्वागत है",
      "enterCredentials": "कृपया आगे बढ़ने के लिए अपना विवरण दर्ज करें",
      "adminId": "व्यवस्थापक उपयोगकर्ता नाम",
      "password": "पासवर्ड",
      "signIn": "साइन इन करें",
      "forgotPassword": "पासवर्ड भूल गए?",
      "loginFailed": "लॉगिन विफल। कृपया अपना विवरण जांचें।",
      "loginSuccess": "सफलतापूर्वक लॉग इन किया गया!",
      "bannerTitle": "बचत गट संचालन का मानकीकरण",
      "bannerSubtitle": "समूह संचालन पर संपूर्ण नियंत्रण",
      "bannerF1": "वास्तविक समय बचत ट्रैकिंग",
      "bannerF2": "स्वचालित ऋण योजना",
      "bannerF3": "मैन्युअल बुककीपिंग हटा दें",
      "mobileNumber": "मोबाइल नंबर",
      "requestOTP": "OTP का अनुरोध करें",
      "enterOTP": "OTP दर्ज करें",
      "verifyOTP": "OTP सत्यापित करें",
      "otpSent": "OTP सफलतापूर्वक भेजा गया",
      "invalidMobile": "मोबाइल नंबर पंजीकृत नहीं है",
      "incorrectOTP": "गलत OTP",
      "addGroupMember": "समूह सदस्य जोड़ें",
      "memberList": "सदस्य सूची",
      "memberName": "सदस्य का पूरा नाम",
      "memberRole": "भूमिका",
      "roleMember": "सदस्य",
      "roleAdmin": "अध्यक्ष/व्यवस्थापक",
      "activeMembers": "सक्रिय सदस्य",
      "totalSavings": "कुल समूह बचत"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'mr', // default to Marathi
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
