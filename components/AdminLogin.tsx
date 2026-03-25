import React, { useState } from 'react';
import { useSiteData } from '../AdminContext';
import { Lock, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { login } = useSiteData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Artificial delay for premium feel
    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError(true);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#0A0A0F]">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-red/60 shadow-lg shadow-brand-red/20 mb-6">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2">Restricted Access</h2>
          <p className="text-white/50 font-sans text-sm font-light">Please enter the administrator password to continue.</p>
        </div>

        <div className="bg-[#141420] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/40 font-medium block ml-1">Admin Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-red transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl pl-12 pr-4 py-4 text-white font-sans focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.08] transition-all placeholder-white/10`}
                  autoFocus
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs mt-2 ml-1 animate-shake">
                  <AlertCircle size={14} />
                  <span>Invalid password. Please try again.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-2xl font-sans font-medium transition-all overflow-hidden ${
                isLoading || !password
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-brand-red text-white hover:bg-brand-red/90 shadow-xl shadow-brand-red/20 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Dashboard</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] font-sans text-white/20 uppercase tracking-widest">Authorized Personnel Only</p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-white/30 text-xs font-sans">
          Forget your password? Contact the developer.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
