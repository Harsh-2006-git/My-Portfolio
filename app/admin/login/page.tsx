"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, LogIn, LayoutDashboard } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[180px] opacity-[0.05] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#0f0f1e] border border-white/8 rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
          {/* Card Header */}
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 border-b border-white/5 px-8 py-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-black text-white mb-1 tracking-tight">Admin Access</h1>
            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Portfolio Control Panel</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Username</label>
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/8 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all placeholder-zinc-700"
                    placeholder="Enter username"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Password</label>
                <div className="relative">
                  <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-3 bg-white/5 border border-white/8 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all placeholder-zinc-700"
                    placeholder="Enter password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-sm py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn size={15} />
                )}
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-[10px] text-zinc-700 font-bold pt-2">
              Restricted area — authorised personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
