import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Lock, LogIn } from "lucide-react";
import { supabase } from "@/lib/supaBaseClient"; // importa o client supabase

interface StaffLoginProps {
  onLogin: () => void;
}

export function StaffLogin({ onLogin }: StaffLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    // login com supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // username é o email registado no supabase
      password,
    });

    if (error) {
      setError("Nome de utilizador ou palavra-passe incorretos");
    } else if (data?.user) {
      onLogin();
    }

    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-semibold">Portal de Funcionários</h1>
        <p className="text-muted-foreground text-sm">
          Faça login para aceder ao sistema de check-in de convidados
        </p>
      </div>

      {/* Card */}
      <Card className="mt-6 p-6 space-y-5 shadow-md max-h-[90vh] overflow-auto">
        <div className="space-y-3">
          <label htmlFor="username" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="username"
            type="email"
            placeholder="Introduza o email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="password" className="text-sm font-medium">
            Palavra-passe
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Introduza a palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <Button onClick={handleLogin} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "A entrar..." : <><LogIn className="w-4 h-4 mr-2" /> Entrar</>}
        </Button>
      </Card>
    </div>
  );
}
