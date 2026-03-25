import { createContext, useContext, useState, useEffect } from "react";

interface User { id: string; email: string; name: string; }
interface AuthContextType {
  user: User | null;
  isLoading: boolean;        
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    fetch("https://delhi-heat-sheild-backend.vercel.app/api/me", {
      credentials: "include", 
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(data.user);
      })
      .finally(() => setIsLoading(false)); // ⬅ done checking
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch("https://delhi-heat-sheild-backend.vercel.app/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ⬅ important!
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setUser(data.user); // ⬅ no more localStorage!
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("https://delhi-heat-sheild-backend.vercel.app/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ⬅ tells browser to save the cookie
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setUser(data.user); // ⬅ just save user, browser handles token
  };

  const logout = async () => {
    await fetch("https://delhi-heat-sheild-backend.vercel.app/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null); // ⬅ clear user, Flask already cleared cookie
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;