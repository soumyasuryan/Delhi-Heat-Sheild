import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "HVI Factors", href: "#hvi-factors" },
  { label: "Search Location", href: "#search-location" },
  { label: "HVI Rating", href: "#hvi-rating" },
  { label: "Impact Zones", href: "#impact-zones" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth(); 
         // ⬅ grab user and logout
  const navigate = useNavigate();
  

  const scrollTo = (href: string) => {
  setMobileOpen(false);

  // ⬅ add this check
  if (href.startsWith("/")) {
    navigate(href);
    return;
  }

  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
};

  const handleLogout = async () => {
    await logout();
    navigate("/");    // ⬅ redirect to home after logout
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-lg font-bold tracking-tight">
          Delhi's <span className="text-primary">HeatShield</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth buttons — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            // ⬅ logged in — show user details + logout
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{user.name || user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-sm font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            // ⬅ logged out — show login + signup
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium"
                onClick={() => navigate("/auth")}
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="text-sm font-semibold"
                onClick={() => navigate("/auth?mode=signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 pb-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* Auth buttons — mobile */}
          <div className="flex gap-3 pt-3 border-t border-border mt-2">
            {user ? (
              // ⬅ logged in — mobile
              <>
                <div className="flex items-center gap-2 text-sm flex-1">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">{user.name || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              // ⬅ logged out — mobile
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-sm"
                  onClick={() => { navigate("/auth"); setMobileOpen(false); }}
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-sm font-semibold"
                  onClick={() => { navigate("/auth?mode=signup"); setMobileOpen(false); }}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
