'use client';

import { useAuth } from '@clerk/nextjs';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const TokenCopier = () => {
  const { getToken } = useAuth();
  const [isCopied, setIsCopied] = useState(false);

  const copyToken = async () => {
    try {
      const token = await getToken({ skipCache: true, leewayInSeconds: 30, template: "default" });
      await navigator.clipboard.writeText(token || '');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy token:', error);
    }
  };

  return (
    <button
      onClick={copyToken}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      title="Copy auth token to clipboard"
    >
      {isCopied ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <Copy className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};