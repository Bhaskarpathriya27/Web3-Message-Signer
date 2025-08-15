/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, type ChangeEvent } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { motion } from "framer-motion";

import {
  FiZap,
  FiLogOut,
  FiCopy,
  FiCheckCircle,
  FiXCircle,
  FiShield,
} from "react-icons/fi";
import Header from "@/components/Header";
import SignMessageCard from "@/components/SignMessage";
import SigningHistory from "@/components/History";

interface SignedMessage {
  message: string;
  signature: string;
  address: string;
  timestamp: number;
  verified?: boolean;
  signer?: string;
}

interface VerificationResult {
  isValid: boolean;
  signer: string;
  originalMessage: string;
  error?: string;
}

export default function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Dynamic hooks
  const { user, primaryWallet, handleLogOut, setShowAuthFlow, sdkHasLoaded } =
    useDynamicContext();

  // Local state
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [signedMessages, setSignedMessages] = useState<SignedMessage[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("signedMessages");
      if (saved) setSignedMessages(JSON.parse(saved));
    }
  }, []);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("signedMessages", JSON.stringify(signedMessages));
    }
  }, [signedMessages]);

  // Handlers
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setError(null);
  };

  const handleSignMessage = async () => {
    if (!message.trim()) {
      setError("Please enter a message to sign");
      return;
    }
    if (!primaryWallet) {
      setError("No wallet connected");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSignature("");
    setVerificationResult(null);

    try {
      // 1) Sign
      const sig = await primaryWallet.signMessage(message);
      if (typeof sig !== "string") {
        setError("Signature generation failed");
        setIsLoading(false);
        return;
      }
      setSignature(sig);

      // 2) Verify (backend)
      const response = await fetch(`${API_BASE_URL}/verify-signature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature: sig }),
      });
      if (!response.ok) throw new Error("Failed to verify signature");
      const result: VerificationResult = await response.json();
      setVerificationResult(result);

      // 3) Save history
      const entry: SignedMessage = {
        message,
        signature: sig,
        address: primaryWallet.address,
        timestamp: Date.now(),
        verified: result.isValid,
        signer: result.signer,
      };
      setSignedMessages((p) => [entry, ...p]);

      // 4) Reset form
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to sign message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => setShowAuthFlow(true);
  const copy = (v: string) => v && navigator.clipboard.writeText(v);

  // ---------- Skeleton while loads ----------
  if (!sdkHasLoaded) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-10 text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 grid place-items-center">
            <motion.div
              className="w-7 h-7 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"
              animate={{ rotate: [0, 360] }} // array form for smooth looping
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
          <p className="text-slate-700 font-semibold">Loading Dynamic SDK…</p>
        </div>
      </div>
    );
  }

  // ---------- Login screen ----------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="p-5">
            <div className="mb-6 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white grid place-items-center shadow-lg">
                <FiShield className="text-3xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 text-center">
              Web3 Message Signer & Verifier
            </h1>
            <p className="mt-3 text-slate-600 text-center">
              Connect your wallet to sign and verify messages securely.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold px-6 py-4 shadow-lg hover:shadow-xl"
            >
              <FiZap className="text-lg" />
              Connect Wallet
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- Main (dashboard) ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Header */}
      <Header
        address={primaryWallet?.address ?? ""}
        onCopy={copy}
        onLogout={handleLogOut}
      />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sign section */}
          <SignMessageCard
            message={message}
            onMessageChange={setMessage}
            onSignMessage={handleSignMessage}
            copy={copy}
            isLoading={isLoading}
            signature={signature}
            verificationResult={verificationResult}
          />

          {/* History */}
          <SigningHistory signedMessages={signedMessages} copy={copy} />
        </div>
      </main>
    </div>
  );
}
