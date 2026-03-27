import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Lock, Phone, Upload, Eye, EyeOff,
  ChevronDown, Home, ChevronRight, Camera, X, Check
} from 'lucide-react';

const ROLES = ['Admin', 'Instructor', 'Student', 'Moderator', 'Support'];
const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
  { code: '+81', flag: '🇯🇵', name: 'JP' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35, ease: 'easeOut' } }),
};

const Create = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    role: '',
    fullName: '',
    username: '',
    countryCode: '+1',
    phone: '',
    email: '',
    password: '',
    gender: '',
    status: 'active',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === form.countryCode) || COUNTRY_CODES[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-main">Create User</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Add a new user to your system
          </p>
        </div>
        <nav className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          <button onClick={() => navigate('/')} className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: 'var(--primary)' }}>
            <Home size={13} /> Home
          </button>
          <ChevronRight size={12} />
          <span>Users</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Create</span>
        </nav>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(var(--shadow-rgb), 0.08)',
        }}
      >
        {/* Avatar Upload */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center mb-8">
          <div className="relative group">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-glow"
              style={{
                background: preview ? 'transparent' : `rgba(var(--primary-rgb), 0.1)`,
                border: `2px dashed ${preview ? 'transparent' : 'rgba(var(--primary-rgb), 0.3)'}`,
              }}
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={28} style={{ color: 'var(--primary)' }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
            {preview && (
              <button
                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: 'var(--primary)' }}
              >
                <X size={12} />
              </button>
            )}
            <div
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shadow-md"
              style={{ background: 'var(--primary)' }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={12} className="text-white" />
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
        </motion.div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Role */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
              Role <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1.5px solid var(--border)',
                  color: form.role ? 'var(--text-main)' : 'var(--text-muted)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="" disabled>Select role</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            </div>
          </motion.div>

          {/* Full Name */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
              Full Name <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => set('fullName', e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </motion.div>

          {/* Username */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
              Username <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>@</span>
              <input
                type="text"
                placeholder="johndoe"
                value={form.username}
                onChange={(e) => set('username', e.target.value)}
                className="w-full rounded-xl pl-9 pr-4 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>Phone</label>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-3 text-sm transition-all duration-200 whitespace-nowrap"
                  style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                >
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="text-xs">{selectedCountry.code}</span>
                  <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
                </button>
                {countryOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 rounded-xl py-1 z-50 min-w-[140px] overflow-hidden"
                    style={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(var(--shadow-rgb), 0.15)' }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { set('countryCode', c.code); setCountryOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-black/5 transition-colors"
                        style={{ color: 'var(--text-main)' }}
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex-1">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="tel"
                  placeholder="123 456 7890"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
              Email <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
              Password <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
                style={{ background: 'var(--surface-solid)', border: '1.5px solid var(--border)', color: 'var(--text-main)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Gender */}
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
          <label className="block text-xs font-semibold mb-2.5" style={{ color: 'var(--text-main)' }}>Gender</label>
          <div className="flex gap-2.5 flex-wrap">
            {['Male', 'Female', 'Other'].map((g) => {
              const active = form.gender === g;
              return (
                <motion.button
                  key={g}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => set('gender', g)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: active ? 'var(--primary)' : 'var(--surface-solid)',
                    color: active ? '#fff' : 'var(--text-main)',
                    border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: active ? '0 4px 14px rgba(var(--primary-rgb), 0.3)' : 'none',
                  }}
                >
                  {active && <Check size={14} />}
                  {g}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Status */}
        <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
          <label className="block text-xs font-semibold mb-2.5" style={{ color: 'var(--text-main)' }}>Status</label>
          <div className="flex gap-2.5">
            {['active', 'inactive'].map((s) => {
              const active = form.status === s;
              return (
                <motion.button
                  key={s}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => set('status', s)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: active ? (s === 'active' ? 'var(--primary)' : '#EF4444') : 'var(--surface-solid)',
                    color: active ? '#fff' : 'var(--text-main)',
                    border: `1.5px solid ${active ? (s === 'active' ? 'var(--primary)' : '#EF4444') : 'var(--border)'}`,
                    boxShadow: active ? `0 4px 14px ${s === 'active' ? 'rgba(var(--primary-rgb), 0.3)' : 'rgba(239,68,68,0.3)'}` : 'none',
                  }}
                >
                  {active && <Check size={14} />}
                  {s}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex justify-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(var(--primary-rgb), 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
              boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.3)',
            }}
          >
            Create User
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Create;
