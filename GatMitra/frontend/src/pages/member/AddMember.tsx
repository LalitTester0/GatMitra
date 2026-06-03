import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { 
  User, 
  MapPin, 
  Save, 
  UploadCloud, 
  Users
} from 'lucide-react';

export const AddMember: React.FC = () => {
  const navigate = useNavigate();
  
  // Local Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [address, setAddress] = useState('');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().substring(0, 10));
  const [language, setLanguage] = useState('english');
  const [nomineeName, setNomineeName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !aadhaar) {
      alert("Please fill in all mandatory fields (*) marked with an asterisk.");
      return;
    }
    // Simulate member save
    console.log("Saving member:", {
      fullName, mobile, gender, dob, aadhaar, address, joinDate, language, nomineeName, relationship
    });
    alert("Member registered successfully!");
    navigate('/members');
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1b1b21] font-sans flex flex-col select-none">
      
      {/* TopAppBar */}
      {/* TopAppBar */}
      <Header />

      {/* Main Form Canvas */}
      <main className="flex-grow overflow-y-auto pt-24 pb-12 px-4 md:px-12 bg-[#fbf8ff]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1b1b21]">Add New Member</h1>
              <p className="text-sm text-[#454652] mt-1">Register a new participant to the Bachat Gat ecosystem.</p>
            </div>
            
            <div className="hidden lg:flex gap-4">
              <button 
                type="button"
                onClick={() => navigate('/members')}
                className="px-6 h-12 rounded-full border-2 border-[#000666] text-[#000666] font-semibold hover:bg-[#f5f2fb] transition text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 h-12 rounded-full bg-[#000666] text-white font-semibold hover:bg-[#1a237e] transition flex items-center gap-2 shadow-sm text-sm"
              >
                <Save className="h-4.5 w-4.5" />
                <span>Save Member</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Form Sections */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Personal Information */}
              <section className="bg-white rounded-xl shadow-sm p-6 border border-[#c6c5d4]/30">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#000666] flex items-center gap-2 mb-6 pb-4 border-b border-[#c6c5d4]/50">
                  <User className="h-4.5 w-4.5 text-[#000666]" />
                  <span>Personal Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="fullName">Full Name *</label>
                    <input 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="fullName" 
                      placeholder="Enter official full name" 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="mobile">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#454652]">+91</span>
                      <input 
                        className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded pl-12 pr-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                        id="mobile" 
                        placeholder="10-digit mobile number" 
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="gender">Gender</label>
                    <select 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="dob">Date of Birth</label>
                    <input 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="dob" 
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="aadhaar">Aadhaar Number *</label>
                    <input 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="aadhaar" 
                      placeholder="12-digit Aadhaar number" 
                      type="text"
                      maxLength={12}
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Contact & Joining */}
              <section className="bg-white rounded-xl shadow-sm p-6 border border-[#c6c5d4]/30">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#000666] flex items-center gap-2 mb-6 pb-4 border-b border-[#c6c5d4]/50">
                  <MapPin className="h-4.5 w-4.5 text-[#000666]" />
                  <span>Contact &amp; Joining Details</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="address">Residential Address</label>
                    <textarea 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors resize-none" 
                      id="address" 
                      placeholder="Enter complete address including village and district" 
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="joinDate">Joining Date *</label>
                    <input 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="joinDate" 
                      type="date"
                      value={joinDate}
                      onChange={(e) => setJoinDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="language">Preferred Language</label>
                    <select 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="hindi">Hindi</option>
                      <option value="marathi">Marathi</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Nominee Details */}
              <section className="bg-white rounded-xl shadow-sm p-6 border border-[#c6c5d4]/30">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#000666] flex items-center gap-2 mb-6 pb-4 border-b border-[#c6c5d4]/50">
                  <Users className="h-4.5 w-4.5 text-[#000666]" />
                  <span>Nominee Details</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="nomineeName">Nominee Name</label>
                    <input 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="nomineeName" 
                      placeholder="Full name of nominee" 
                      type="text"
                      value={nomineeName}
                      onChange={(e) => setNomineeName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#454652]" htmlFor="relationship">Relationship with Member</label>
                    <select 
                      className="w-full bg-[#fbf8ff] border-2 border-[#c6c5d4]/60 rounded px-4 py-2.5 text-sm text-[#1b1b21] focus:border-[#000666] focus:outline-none transition-colors h-11" 
                      id="relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                    >
                      <option value="">Select Relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Photo Upload & Action Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Photo Upload */}
              <section className="bg-white rounded-xl shadow-sm p-6 border border-[#c6c5d4]/30 flex flex-col items-center text-center">
                <h2 className="text-sm font-bold text-[#000666] w-full text-left mb-4 uppercase tracking-wider">Member Photo</h2>
                
                <div className="w-32 h-32 rounded-full bg-[#f5f2fb] border-4 border-white flex items-center justify-center mb-6 shadow-sm overflow-hidden relative group">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-[#454652]" />
                  )}
                  <label className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center flex-col text-white cursor-pointer transition-all">
                    <UploadCloud className="h-5 w-5" />
                    <span className="text-[10px] font-semibold mt-1">Change</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>

                <label className="w-full cursor-pointer">
                  <input accept="image/*" className="hidden" type="file" onChange={handlePhotoUpload} />
                  <div className="border-2 border-dashed border-[#c6c5d4] rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-[#454652] hover:bg-[#f5f2fb] hover:border-[#000666] transition-colors min-h-[120px]">
                    <UploadCloud className="h-6 w-6 text-[#000666]" />
                    <span className="text-xs font-semibold text-[#000666]">Click to upload photo</span>
                    <span className="text-[10px] text-[#454652] mt-0.5">JPG, PNG up to 2MB</span>
                  </div>
                </label>
              </section>

              {/* Mobile Action Buttons */}
              <div className="lg:hidden flex flex-col gap-4 mt-4">
                <button 
                  type="submit"
                  className="w-full h-12 bg-[#000666] text-white font-semibold rounded-full shadow-sm flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>Save Member</span>
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/members')}
                  className="w-full h-12 border-2 border-[#000666] text-[#000666] font-semibold rounded-full text-sm"
                >
                  Cancel
                </button>
              </div>

              {/* Registration Status */}
              <div className="bg-[#f5f2fb] rounded-xl p-6 border border-[#c6c5d4]/20 hidden lg:block">
                <h3 className="text-xs font-semibold text-[#454652] mb-2 uppercase tracking-wider">Registration Status</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1b6d24] animate-pulse"></div>
                  <span className="text-sm text-[#1b1b21] font-semibold">Draft - Unsaved</span>
                </div>
                <p className="text-xs text-[#454652] mt-4 leading-relaxed">
                  Ensure all mandatory fields (*) marked with an asterisk are completed before saving.
                </p>
              </div>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
};
