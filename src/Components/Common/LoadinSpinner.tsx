import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      
      <p className="text-2xl font-semibold text-black">LOADING...</p>
    </div>
  );
}
