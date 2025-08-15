import { motion } from "framer-motion";
import { FiZap, FiCopy, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface VerificationResult {
  isValid: boolean;
  signer: string;
  originalMessage: string;
}

interface SignMessageCardProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSignMessage: () => void;
  copy: (text: string) => void;
  isLoading: boolean;
  error?: string;
  signature?: string;
  verificationResult?: VerificationResult | null;
}

export default function SignMessageCard({
  message,
  onMessageChange,
  onSignMessage,
  copy,
  isLoading,
  error,
  signature,
  verificationResult,
}: SignMessageCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 grid place-items-center">
            <FiZap />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Sign a Custom Message
          </h2>
        </div>

        {/* Message Input */}
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your message here…"
          disabled={isLoading}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
        />

        {/* Sign Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onSignMessage}
          disabled={isLoading || !message.trim()}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isLoading ? "Signing…" : "Sign Message"}
        </motion.button>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
            Error: {error}
          </div>
        )}

        {/* Signature */}
        {signature && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="mb-2 flex items-center gap-2 font-medium text-emerald-800">
              <FiCheckCircle /> Signature Generated
            </p>
            <div className="flex items-start gap-2">
              <code className="block w-full break-all rounded-xl border border-emerald-200 bg-white p-3 font-mono text-xs text-slate-800">
                {signature}
              </code>
              <button
                onClick={() => copy(signature)}
                className="shrink-0 h-9 w-9 grid place-items-center rounded-xl border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-100"
                title="Copy signature"
              >
                <FiCopy />
              </button>
            </div>
          </div>
        )}

        {/* Verification */}
        {verificationResult && (
          <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <p className="mb-2 font-medium text-sky-800">
              Backend Verification
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Valid:</span>
                {verificationResult.isValid ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    <FiCheckCircle /> Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-rose-700">
                    <FiXCircle /> No
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Signer:</span>
                <code className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-gray-600 font-mono">
                  {verificationResult.signer}
                </code>
                <button
                  onClick={() => copy(verificationResult.signer)}
                  className="ml-1 text-slate-500 hover:text-slate-700"
                  title="Copy signer"
                >
                  <FiCopy />
                </button>
              </div>
              <div>
                <span className="text-slate-600">Original Message:</span>{" "}
                <span className="text-slate-800">
                  {verificationResult.originalMessage}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
