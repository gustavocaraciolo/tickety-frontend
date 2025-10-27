'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';

export function AuthButtons() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="relative group">
        <Button variant="ghost" className="flex items-center space-x-2">
          <span className="hidden md:block">{user.name}</span>
          <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </Button>
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button as="link" href="/sign-in" isWhite>
        Entrar
      </Button>
      <Button as="link" href="/create-account" isPrimary>
        Cadastrar
      </Button>
    </div>
  );
}
