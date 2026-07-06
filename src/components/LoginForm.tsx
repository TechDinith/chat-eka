import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Button, Input, Modal } from "./ui";

interface Props {
  onLogin: (username: string, nic: string) => Promise<void>;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [nic, setNic] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!accepted) return;
    setLoading(true);
    try {
      await onLogin(username, nic);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-32 mb-4" alt="Logo" />
          <h1 className="text-2xl font-bold text-white text-center">
            පහලින් සෙට් වෙන්න
          </h1>
          <p className="text-sm text-white/50 text-center mt-1 max-w-xs">
            කැමති username එකක් දාගෙන NIC එක ගහල ලොග් වෙන්න
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-white/70 mb-1.5"
            >
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="nic" className="block text-sm text-white/70 mb-1.5">
              NIC
            </label>
            <Input
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              placeholder="Enter your NIC number"
              required
              pattern="^\d{9}(?:[VX]|[vx])$|^\d{12}$"
              title="NIC must be 10 digits ending with V/X, or 12 digits"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => {
                setAccepted(e.target.checked);
                setTouched(false);
              }}
              className="mt-0.5 accent-indigo-500"
            />
            <span className="text-white/60">
              I accept the{" "}
              <span
                className="text-indigo-400 cursor-pointer underline hover:text-indigo-300"
                onClick={() => setShowTerms(true)}
              >
                terms and conditions
              </span>
            </span>
          </label>
          {touched && !accepted && (
            <p className="text-red-400 text-xs">
              Please accept the terms and conditions.
            </p>
          )}

          <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </Button>
        </form>
      </div>

      <Modal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms and Conditions"
      >
        <p className="text-sm text-white/70 leading-relaxed">
          We do not save your NIC on our servers. By accepting, you acknowledge
          that we have no responsibilities whatsoever about the users or chats
          that happen once you're logged in and also confirm that you allow us
          to use your NIC for determining your birth year and gender.
        </p>
      </Modal>
    </div>
  );
}
