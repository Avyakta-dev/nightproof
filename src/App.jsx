import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import LandingPage from "./pages/LandingPage";
import SignupStandard from "./pages/SignupStandard";
import SignupPrivate from "./pages/SignupPrivate";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" | "signup"
  const [privacyOn, setPrivacyOn] = useState(true);

  const goToSignup = (privacy) => {
    setPrivacyOn(privacy);
    setPage("signup");
  };

  return (
    <div
      className="min-h-screen bg-black px-4 py-16 text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <WalletConnect />

      {page === "landing" && <LandingPage onSignUp={goToSignup} />}
      {page === "signup" && privacyOn && (
        <SignupPrivate onBack={() => setPage("landing")} />
      )}
      {page === "signup" && !privacyOn && (
        <SignupStandard onBack={() => setPage("landing")} />
      )}
    </div>
  );
}