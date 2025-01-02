import React from "react";

const LiquidWaveLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-24 h-24"
      >
        <defs>
          {/* Gradien untuk efek warna */}
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          {/* Masking lingkaran */}
          <mask id="mask">
            <rect width="200" height="200" fill="white" />
            <circle cx="100" cy="100" r="70" fill="black" />
          </mask>
        </defs>
        {/* Latar belakang gradien */}
        <rect
          width="200"
          height="200"
          fill="url(#gradient)"
          mask="url(#mask)"
        />
        {/* Gelombang */}
        <path
          fill="url(#gradient)"
          d="M0 100 Q50 150 100 100 T200 100 V200 H0 Z"
          className="animate-wave"
        />
      </svg>

      {/* Definisi animasi */}
      <style jsx>{`
        .animate-wave {
          animation: wave 2s infinite ease-in-out;
        }

        @keyframes wave {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LiquidWaveLoader;
