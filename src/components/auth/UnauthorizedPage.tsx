import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ShieldAlert, Home } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Akses Ditolak</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan
        hubungi administrator untuk mendapatkan akses.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
