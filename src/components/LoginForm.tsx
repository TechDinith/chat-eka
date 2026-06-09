import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Button, Input, Modal } from "./ui";

interface Props {
  onLogin: (username: string, nic: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [nic, setNic] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) return alert("Please accept the terms and conditions.");
    onLogin(username, nic);
  };

  return (
    <div className="bg-black/70 text-white flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center mb-4">
        <img src={logo} className="w-1/3 md:w-1/6" alt="Logo" />
        <h2 className="text-3xl md:text-5xl mb-2 mt-4">ට පහලින් සෙට් වෙන්න</h2>
        <p className="text-sm text-center max-w-md">
          Register වෙන්න ඕනෙ නෑ කැමති username එකක් දාගෙන NIC/ID නම්බර් එක
          ගහල ලොග් වෙන්න
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded shadow-md flex flex-col gap-3 w-full max-w-sm mx-4"
      >
        <h2 className="text-5xl text-center mb-2">Login</h2>
        <div>
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="nic" className="block mb-1">
            NIC:
          </label>
          <Input
            id="nic"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="NIC"
            required
            pattern="^\d{9}(?:[VX]|[vx])$|^\d{12}$"
            title="NIC must be 10 digits ending with V/X, or 12 digits"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          I accept the{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => setShowTerms(true)}
          >
            terms and conditions
          </span>
        </label>
        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
      </form>

      <Modal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms and Conditions"
      >
        <p>
          We do not save your NIC on our servers. By accepting, you acknowledge
          that we have no responsibilities whatsoever about the users or chats
          that happen once you're logged in and also confirm that you allow us
          to use your NIC for determining your birth year and gender.
        </p>
      </Modal>
    </div>
  );
}
