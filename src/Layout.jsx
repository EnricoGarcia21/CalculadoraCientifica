import React from 'react';
import ThemeToggle from '@/components/calculator/ThemeToggle'; // Import ThemeToggle

export default function Layout({ children, isDark, toggleTheme }) { // Accept isDark and toggleTheme props
  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-10"> {/* Positioning for ThemeToggle */}
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
      {children}
    </div>
  );
}