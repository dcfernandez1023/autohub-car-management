"use client";
import axios from "axios";
import { useEffect } from "react";

/**
 * Supabase redirects to this page when user clicks the registration link
 * sent to their email.
 */
export default function Page() {
  useEffect(() => {
    const urlHash = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(urlHash);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    const completeRegistration = async () => {
      try {
        // Complete registration by marking user as confirmed sign in on server-side
        const res = await axios.post("/api/auth/confirm", {
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        if (res.status === 200) window.location.href = "/";
        else window.location.href = "/error";
      } catch (e) {
        alert("An unexpected error occurred");
        window.location.href = "/error";
      }
    };

    void completeRegistration();
  }, []);
}
