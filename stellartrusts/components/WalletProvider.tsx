"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { isAllowed, setAllowed, requestAccess, getAddress, isConnected } from "@stellar/freighter-api";

interface WalletContextType {
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkWallet();
  }, []);

  const checkWallet = async () => {
    try {
      if (await isConnected()) {
        const allowed = await isAllowed();
        if (allowed) {
          const userAddress = await getAddress();
          setAddress(userAddress.address);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      await setAllowed();
      const userAddress = await requestAccess();
      setAddress(userAddress.address);
    } catch (e) {
      console.error("Wallet connection failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
