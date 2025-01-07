"use client";
import { ReactNode, useState, useEffect } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading dengan delay (atau logika fetch data jika diperlukan)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Delay 1 detik untuk simulasi

    return () => clearTimeout(timeout); // Cleanup jika komponen di-unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
        <span className="hollow-text-spinner">HYPETIX</span>
      </div>
    );
  }

  return <main>{children}</main>;
}
