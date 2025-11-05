'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

export function AuthButtons() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  if (user) {
    const userInitial = user.name.charAt(0).toUpperCase();
    const userNameParts = user.name.split(' ');
    const displayName = userNameParts.length > 1 
      ? `${userNameParts[0]} ${userNameParts[userNameParts.length - 1].charAt(0)}.`
      : user.name.length > 15 
        ? `${user.name.substring(0, 15)}...`
        : user.name;

    return (
      <div className="relative" ref={menuRef}>
        {/* Botão do Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 border border-gray-200 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Menu do usuário"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-semibold text-sm shadow-md ring-2 ring-white">
              {userInitial}
            </div>
            {/* Indicador de status online */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          
          {/* Nome do usuário (desktop) */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {displayName}
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              Minha conta
            </span>
          </div>
        </button>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <>
            {/* Overlay para mobile */}
            <div 
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
              {/* Header do menu */}
              <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-semibold text-lg shadow-md ring-2 ring-white">
                    {userInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {user.email || 'Usuário'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Opções do menu */}
              <div className="py-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Icon name="home" className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Dashboard</p>
                    <p className="text-xs text-gray-500">Painel de controle</p>
                  </div>
                  <Icon name="chevron-right" className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon name="user" className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Perfil</p>
                    <p className="text-xs text-gray-500">Editar informações</p>
                  </div>
                  <Icon name="chevron-right" className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                {/* Divisor */}
                <div className="my-2 border-t border-gray-100"></div>

                {/* Botão de sair */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <Icon name="logout" className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">Sair</p>
                    <p className="text-xs text-red-500">Encerrar sessão</p>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
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
