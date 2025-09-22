import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [step, setStep] = useState<'register' | 'verify'>('register');

  async function submit() {
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    setUserId(data.userId);
    setOtp(data.otp);
    setStep('verify');
  }
  async function verify() {
    await fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) });
    window.location.href = '/citizen/dashboard';
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Citizen Register</h1>
      {step === 'register' ? (
        <div className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="primary" onClick={submit}>Register</button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-gray-600">Dev OTP: {otp}</div>
          <input className="w-full border p-2 rounded" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button className="primary" onClick={verify}>Verify</button>
        </div>
      )}
    </div>
  );
}
