import { FiShield, FiCopy, FiLogOut } from "react-icons/fi";

interface HeaderProps {
  address: string;
  onCopy: (text: string) => void;
  onLogout: () => void;
}

export default function Header({ address, onCopy, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 grid place-items-center text-white">
            <FiShield />
          </div>
          <span className="font-semibold text-slate-900">
            Web3 Message Signer
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onCopy(address)}
            className="group max-w-[260px] truncate rounded-full border border-slate-200 bg-white px-4 py-2 font-mono text-xs text-slate-700 hover:shadow-md"
            title="Click to copy"
          >
            {address || "No address"}
            <FiCopy className="inline ml-2 align-text-top text-slate-400 group-hover:text-slate-600" />
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700 hover:bg-rose-100"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
