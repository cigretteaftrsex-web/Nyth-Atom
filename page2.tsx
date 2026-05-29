"use client";
import { useEffect, useState } from 'react';
import { Wallet, Wifi, Star, Gift, Gamepad2, LogOut, ChevronRight, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('atom_token');
    const msisdn = localStorage.getItem('msisdn');
    const userId = localStorage.getItem('user_id');
    const headers = { 'authorization': `Bearer ${token}` };

    try {
      const [resBal, resPts] = await Promise.all([
        fetch(`/api/atom/mytmapi/v1/my/lightweight-balance?msisdn=${msisdn}&userid=${userId}&v=4.14.1`, { headers }),
        fetch(`/api/atom/mytmapi/v1/my/point-system/dashboard?msisdn=${msisdn}&userid=${userId}&v=4.14.1`, { headers })
      ]);
      const balJson = await resBal.json();
      const ptsJson = await resPts.json();
      setData(balJson.data.attribute);
      setPoints(ptsJson.data.attribute);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0f1d] flex flex-col items-center justify-center text-white">
      <RefreshCw className="animate-spin mb-4 text-green-500" size={40} />
      <p className="font-['Noto_Sans_Myanmar']">ဒေတာများဆွဲယူနေပါသည်...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-['Noto_Sans_Myanmar'] max-w-md mx-auto relative pb-24">
      {/* Top Header */}
      <div className="p-6 flex justify-between items-center sticky top-0 z-20 bg-[#0a0f1d]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-2xl font-black">N</div>
          <div>
            <h1 className="font-bold text-lg">Nyth Atom</h1>
            <p className="text-xs text-slate-400 font-mono">+{data.msisdn}</p>
          </div>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
          <LogOut size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-[40px] p-8 shadow-2xl shadow-green-900/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-2">လက်ကျန်ဖုန်းဘေလ်</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter">{data.mainBalance.value}</span>
              <span className="text-xl font-bold opacity-80">Ks</span>
            </div>
            <div className="mt-6 flex gap-2">
               <span className="bg-white/20 text-[10px] px-3 py-1 rounded-full backdrop-blur-md uppercase font-bold">Expires: {new Date(data.mainBalance.generatedAt * 1000).toLocaleDateString()}</span>
            </div>
          </div>
          <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/40 border border-white/5 p-6 rounded-[32px] hover:bg-slate-800/60 transition-colors">
            <Wifi className="text-blue-400 mb-3" size={28} />
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">DATA BALANCE</p>
            <p className="text-2xl font-black">{data.packsPieData.data.remaining} <span className="text-xs font-normal">MB</span></p>
          </div>
          <div className="bg-slate-800/40 border border-white/5 p-6 rounded-[32px] hover:bg-slate-800/60 transition-colors">
            <Star className="text-yellow-400 mb-3" size={28} />
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">ATOM POINTS</p>
            <p className="text-2xl font-black">{points.totalPoint} <span className="text-xs font-normal">pts</span></p>
          </div>
        </div>

        {/* Rewards / Tier Section */}
        <div className="bg-slate-800/40 rounded-[32px] p-6 border border-white/5">
           <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Gift size={18} /></div>
                <span className="font-bold text-sm">Star Rewards</span>
              </div>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{points.starStatusLabel}</span>
           </div>
           <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                style={{ width: `${(points.progressBar.earnedPoint / points.progressBar.totalRequiredPoint) * 100}%` }}
              ></div>
           </div>
           <p className="text-[11px] text-slate-400 leading-relaxed">{points.progressBar.nextTierEligibilityText}</p>
        </div>

        {/* Action List */}
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 px-2 uppercase tracking-widest">Quick Actions</h3>
            <div className="bg-slate-800/40 rounded-[32px] divide-y divide-white/5 overflow-hidden border border-white/5">
                <div className="p-5 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center"><Gamepad2 size={20} /></div>
                        <span className="font-bold text-sm">တို့တို့ (Toh Toh United)</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-600" />
                </div>
                <div className="p-5 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center"><Gamepad2 size={20} /></div>
                        <span className="font-bold text-sm">ရွှေလယ်တော (Golden Farm)</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-600" />
                </div>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0a0f1d]/95 backdrop-blur-2xl border-t border-white/5 h-20 flex justify-around items-center px-8 z-30">
        <Wifi className="text-green-500" />
        <Star className="text-slate-600" />
        <div className="w-14 h-14 bg-green-600 rounded-2xl -mt-12 flex items-center justify-center shadow-2xl shadow-green-600/50 border-4 border-[#0a0f1d] active:scale-90 transition-transform">
            <Gamepad2 color="white" size={28} />
        </div>
        <Gift className="text-slate-600" />
        <Wallet className="text-slate-600" />
      </div>
    </div>
  );
}
