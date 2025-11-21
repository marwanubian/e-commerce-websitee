"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getAddresses, updateProfile as serverUpdateProfile } from "-/actions/profile.action";
import { getUserProfile } from "-/actions/getUserAction";
// import { getUserProfile } from "-/actions/profile.action"; // server action to fetch profile

// Interfaces for typing
export interface UserProfile {
  name: string;
  email: string;
  image?: string;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// 1️⃣ Context type
interface ProfileContextType {
  profile: UserProfile | null;
  addresses: Address[];
  setProfile: (profile: UserProfile | null) => void;
  refreshProfile: () => Promise<void>;
  refreshAddresses: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

// 2️⃣ Create context with defaults
const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  addresses: [],
  setProfile: () => {},
  refreshProfile: async () => {},
  refreshAddresses: async () => {},
  updateProfile: async () => {},
});

// 3️⃣ Provider
export function ProfileContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Fetch latest profile
  const refreshProfile = async () => {
    if (!session?.user) return;
    try {
      const updatedProfile = await getUserProfile();
      setProfile(updatedProfile);
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  // Fetch latest addresses
  const refreshAddresses = async () => {
    if (!session?.user) return;
    try {
      const latestAddresses = await getAddresses();
      setAddresses(latestAddresses);
    } catch (err) {
      console.error("Failed to refresh addresses:", err);
    }
  };

  // Update profile via server action and refresh context
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      await serverUpdateProfile(data);
      await refreshProfile(); // ensure context has latest data
    } catch (err) {
      console.error("Profile update failed:", err);
      throw err;
    }
  };

  // Fetch on mount & whenever session changes
  useEffect(() => {
    if (session?.user) {
      refreshProfile();
      refreshAddresses();
    } else {
      setProfile(null);
      setAddresses([]);
    }
  }, [session]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        addresses,
        setProfile,
        refreshProfile,
        refreshAddresses,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// 4️⃣ Custom hook
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileContextProvider");
  }
  return context;
}
