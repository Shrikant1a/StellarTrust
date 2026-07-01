'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type NetworkType = 'testnet' | 'mainnet';

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
  contractId: string;
  rpcUrl: string;
  explorerUrl: string;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>('testnet');

  useEffect(() => {
    const savedNetwork = localStorage.getItem('trustlance_network');
    if (savedNetwork === 'mainnet' || savedNetwork === 'testnet') {
      setNetworkState(savedNetwork);
    }
  }, []);

  const setNetwork = (net: NetworkType) => {
    setNetworkState(net);
    localStorage.setItem('trustlance_network', net);
  };

  const contractId = network === 'mainnet'
    ? 'CBRUX4SHIELDCONTR4ACTD9E0F1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O'
    : 'CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y';

  const rpcUrl = network === 'mainnet'
    ? 'https://soroban-mainnet.stellar.org'
    : 'https://soroban-testnet.stellar.org';

  const explorerUrl = network === 'mainnet'
    ? 'https://stellar.expert/explorer/public/contract/CBRUX4SHIELDCONTR4ACTD9E0F1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O'
    : 'https://stellar.expert/explorer/testnet/contract/CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y';

  return (
    <NetworkContext.Provider value={{ network, setNetwork, contractId, rpcUrl, explorerUrl }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
