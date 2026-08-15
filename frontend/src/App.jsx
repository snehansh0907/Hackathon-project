import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FacilityDetails from "./pages/FacilityDetails";
import ReportFacility from "./pages/ReportFacility";
import { supabase, isSupabaseConfigured } from "./services/supabaseClient";

/**
 * Root component: holds the (very simple) auth state and renders
 * the Navbar + routed pages.
 */
export default function App() {
  const [user, setUser] = useState(null);

  // Restore session on load and stay in sync if it changes elsewhere.
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogout() {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setUser(null);
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/facility/:id" element={<FacilityDetails />} />
        <Route path="/facility/:id/report" element={<ReportFacility />} />
      </Routes>
    </>
  );
}
