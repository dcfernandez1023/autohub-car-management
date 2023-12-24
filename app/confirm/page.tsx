"use client";
import axios from "axios";
import { useEffect } from "react";

/**
 * Supabase redirects to this page when user clicks the registration link
 * sent to their email.
 */
export default function Page() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const completeRegistration = async () => {
      try {
        // Complete registration by marking user as confirmed sign in on server-side
        const res = await axios.post("/api/auth/confirm", { code });
        if (res.status !== 200)
          alert("Failed to verify your registration, please try again");
      } catch (err: unknown) {
        console.error(err);
        alert("An unexpected error occurred");
      } finally {
        window.location.href = "/";
      }
    };

    void completeRegistration();
  }, []);
}
