import { motion } from "framer-motion";
import { FiShield, FiCheckCircle, FiXCircle, FiCopy } from "react-icons/fi";

export interface SignedMessage {
  message: string;
  timestamp: number;
  address: string;
  signer?: string;
  signature: string;
  verified?: boolean; // changed to optional
}

interface SigningHistoryProps {
  signedMessages: SignedMessage[];
  copy: (text: string) => void;
}

export default function SigningHistory({
  signedMessages,
  copy,
}: SigningHistoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 grid place-items-center">
              <FiShield />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              Signing History
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            {signedMessages.length} messages
          </span>
        </div>

        {/* List */}
        <div className="max-h-[460px] overflow-y-auto pr-1 space-y-3">
          {signedMessages.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              No messages signed yet.
            </div>
          ) : (
            signedMessages.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"
              >
                {/* Row 1: Message + Verified status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-slate-900 font-medium">
                      {e.message}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(e.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm ${
                      e.verified
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {e.verified ? (
                      <>
                        <FiCheckCircle /> Verified
                      </>
                    ) : (
                      <>
                        <FiXCircle /> Failed
                      </>
                    )}
                  </span>
                </div>

                {/* Row 2: Address & Signer */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500">Address</p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="truncate font-mono text-slate-800 border border-slate-200 bg-slate-50 px-2 py-1 rounded-md w-full">
                        {e.address}
                      </code>
                      <button
                        onClick={() => copy(e.address)}
                        className="text-slate-500 hover:text-slate-700"
                        title="Copy address"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500">Signer</p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="truncate font-mono text-slate-800 border border-slate-200 bg-slate-50 px-2 py-1 rounded-md w-full">
                        {e.signer || "N/A"}
                      </code>
                      {e.signer && (
                        <button
                          onClick={() => copy(e.signer!)}
                          className="text-slate-500 hover:text-slate-700"
                          title="Copy signer"
                        >
                          <FiCopy />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 3: Signature */}
                <details className="mt-3 group">
                  <summary className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Show Signature
                  </summary>
                  <div className="mt-2 flex items-start gap-2">
                    <code className="block w-full break-all rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] text-slate-800">
                      {e.signature}
                    </code>
                    <button
                      onClick={() => copy(e.signature)}
                      className="shrink-0 h-9 w-9 grid place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      title="Copy signature"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </details>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
