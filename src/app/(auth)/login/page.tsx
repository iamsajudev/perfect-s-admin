"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-96 shadow">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          className="mt-3"
          onChange={e => setPassword(e.target.value)}
        />

        <Button className="w-full mt-4" onClick={() => login(email, password)}>
          Login
        </Button>
      </div>
    </div>
  );
}
