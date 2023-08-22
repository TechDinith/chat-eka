import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, nic: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [nic, setNIC] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptedTerms) {
      onLogin(username, nic);
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="bg-black text-white bg-opacity-70 flex flex-col gap-6 items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center">
        <h2 className="text-5xl mb-4 m-4">චැට් එකට පහලින් සෙට් වෙන්න</h2>
        <p className="text-sm mb-4 m-4">
          Register වෙන්න ඕනෙ නෑ කැමති username එකක් දාගෙන NIC/ID නම්බර් එක ගහල
          ලොග් වෙන්න
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black m-4 p-8 rounded shadow-md flex flex-col gap-2"
      >
        <div className="flex justify-center">
          <h2 className="text-5xl mb-4">Login</h2>
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            className="p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nic">NIC: </label>
          <input
            id="nic"
            type="text"
            className="p-2"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            required
            pattern="^\d{9}(?:[VX]|[vx])$|^\d{12}$"
            title="NIC must be 10 digits with 'V', 'X' or only digits (for 12 digits)"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mr-2"
            required
          />
          <label htmlFor="acceptTerms">
            I accept the{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setShowTermsPopup(true)}
            >
              terms and conditions
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
        >
          Login
        </button>
      </form>
      {showTermsPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white text-black p-4 rounded shadow-md max-w-md overflow-auto">
            <h3 className="text-xl font-semibold mb-2">Terms and Conditions</h3>
            <p>
              We do not save this information on our servers. By accepting these
              terms, you acknowledge that we have no responsibilities whatsoever
              about the users or chats that happen once you're logged in and wll
              also confim that you allow us to use your NIC Number (National
              Idendtity Card Number) for determining your birth year and gender.
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowTermsPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
