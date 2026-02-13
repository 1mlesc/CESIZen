import React from "react";
import { Leaf } from "lucide-react";

const AuthImagePanel = ({ title, quote }) => {
  return (
    <div className="hidden lg:flex w-1/2 bg-linear-to-br from-green-600 to-green-800 p-12 flex-col justify-between text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex items-center gap-2 font-bold text-2xl">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        CESI Zen
      </div>

      <div className="relative z-10 max-w-md">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <blockquote className="text-green-50 text-lg italic border-l-4 border-yellow-400 pl-4 py-2">
          &quot;{quote}&quot;
        </blockquote>
      </div>
      <div>

      </div>
    </div>
  );
};

export default AuthImagePanel;