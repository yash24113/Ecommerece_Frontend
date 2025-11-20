// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import loginIllustration from "@/assets/login.jpg"; // update path/name if needed

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-5xl bg-card rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left image */}
        <div className="hidden md:block bg-muted">
          <img
            src={loginIllustration}
            alt="Shopping illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right form */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold mb-2">Log in to Exclusive</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Enter your details below
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Phone Number"
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button type="submit" variant="destructive" className="px-8">
                  Log In
                </Button>

                <button
                  type="button"
                  className="text-sm text-destructive hover:underline"
                  onClick={() => navigate("/")}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
