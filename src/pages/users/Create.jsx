import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Home, ChevronRight, User, Mail, Lock, Phone, Upload, Eye, EyeOff, X, UserPlus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const roles = ['Admin', 'Instructor', 'Student', 'Moderator', 'Manager'];
const genders = ['Male', 'Female', 'Other'];
const countryCodes = [
  { code: '+1', flag: '🇺🇸', label: 'US' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+91', flag: '🇮🇳', label: 'IN' },
  { code: '+61', flag: '🇦🇺', label: 'AU' },
  { code: '+81', flag: '🇯🇵', label: 'JP' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+86', flag: '🇨🇳', label: 'CN' },
];

const CreateUser = () => {
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
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setPreview(null);
    setFileName('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const selectedCountry = countryCodes.find(c => c.code === form.countryCode) || countryCodes[0];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-main">Create User</h1>
          <p className="text-sm text-muted-custom mt-1">Add a new user to your system</p>
        </div>
        <nav className="flex items-center gap-1.5 text-sm text-muted-custom">
          <Link to="/" className="flex items-center gap-1 hover:text-main transition-colors">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} />
          <span>Users</span>
          <ChevronRight size={14} />
          <span className="font-medium" style={{ color: 'var(--primary)' }}>Create</span>
        </nav>
      </div>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-surface rounded-2xl p-6 md:p-8 shadow-glass"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">
              Role <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <select
                required
                value={form.role}
                onChange={e => update('role', e.target.value)}
                className="w-full h-11 rounded-xl bg-surface-solid text-main text-sm px-4 pr-10 appearance-none transition-all duration-200 outline-none"
                style={{
                  border: '1.5px solid var(--border)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              >
                <option value="" disabled>Select role</option>
                {roles.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
              </select>
              <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-muted-custom pointer-events-none" />
            </div>
          </div>

          {/* Full Name */}
          <InputField
            label="Full Name"
            required
            icon={<User size={16} />}
            placeholder="John Doe"
            value={form.fullName}
            onChange={v => update('fullName', v)}
          />

          {/* Username */}
          <InputField
            label="Username"
            required
            icon={<span className="text-xs font-bold">@</span>}
            placeholder="johndoe"
            value={form.username}
            onChange={v => update('username', v)}
          />

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">Phone</label>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={form.countryCode}
                  onChange={e => update('countryCode', e.target.value)}
                  className="h-11 rounded-xl bg-surface-solid text-main text-sm pl-3 pr-8 appearance-none transition-all duration-200 outline-none"
                  style={{ border: '1.5px solid var(--border)', minWidth: '90px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                >
                  {countryCodes.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <ChevronRight size={14} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-muted-custom pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  placeholder="123 456 7890"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  className="w-full h-11 rounded-xl bg-surface-solid text-main text-sm pl-10 pr-4 transition-all duration-200 outline-none"
                  style={{ border: '1.5px solid var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <InputField
            label="Email"
            required
            type="email"
            icon={<Mail size={16} />}
            placeholder="john@example.com"
            value={form.email}
            onChange={v => update('email', v)}
          />

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">
              Password <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom">
                <Lock size={16} />
              </div>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => update('password', e.target.value)}
                className="w-full h-11 rounded-xl bg-surface-solid text-main text-sm pl-10 pr-12 transition-all duration-200 outline-none"
                style={{ border: '1.5px solid var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-custom hover:text-main transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">Profile Picture</label>
            {preview ? (
              <div className="relative h-11 rounded-xl bg-surface-solid flex items-center gap-3 px-4" style={{ border: '1.5px solid var(--border)' }}>
                <img src={preview} alt="Preview" className="h-7 w-7 rounded-full object-cover" />
                <span className="text-sm text-main truncate flex-1">{fileName}</span>
                <button type="button" onClick={removeFile} className="text-muted-custom hover:text-main transition-colors">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-24 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer group"
                style={{ border: '2px dashed var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(var(--primary-rgb), 0.1)' }}
                >
                  <Upload size={18} style={{ color: 'var(--primary)' }} />
                </div>
                <span className="text-xs text-muted-custom group-hover:text-main transition-colors">
                  Click to upload
                </span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">Gender</label>
            <div className="flex gap-2">
              {genders.map(g => {
                const active = form.gender === g.toLowerCase();
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => update('gender', g.toLowerCase())}
                    className="flex-1 h-11 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: active ? 'var(--primary)' : 'var(--surface-solid)',
                      color: active ? '#fff' : 'var(--text-main)',
                      border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                      boxShadow: active ? '0 0 12px rgba(var(--primary-rgb), 0.3)' : 'none',
                    }}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-main">Status</label>
            <div className="flex gap-2">
              {['active', 'inactive'].map(s => {
                const active = form.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('status', s)}
                    className="flex-1 h-11 rounded-xl text-sm font-medium capitalize transition-all duration-200"
                    style={{
                      background: active ? (s === 'active' ? 'var(--primary)' : '#ef4444') : 'var(--surface-solid)',
                      color: active ? '#fff' : 'var(--text-main)',
                      border: active ? `1.5px solid ${s === 'active' ? 'var(--primary)' : '#ef4444'}` : '1.5px solid var(--border)',
                      boxShadow: active ? `0 0 12px ${s === 'active' ? 'rgba(var(--primary-rgb), 0.3)' : 'rgba(239,68,68,0.3)'}` : 'none',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 px-8 rounded-xl text-white font-semibold text-sm flex items-center gap-2 transition-shadow duration-200"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
              boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.35)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 28px rgba(var(--primary-rgb), 0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--primary-rgb), 0.35)'}
          >
            <UserPlus size={18} />
            Create User
          </motion.button>
        </div>
      </motion.form>
    </DashboardLayout>
  );
};

/* ── Reusable Input Field ── */
const InputField = ({ label, required, icon, type = 'text', placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-main">
      {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom">
        {icon}
      </div>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 rounded-xl bg-surface-solid text-main text-sm pl-10 pr-4 transition-all duration-200 outline-none"
        style={{ border: '1.5px solid var(--border)' }}
        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  </div>
);

export default CreateUser;
