import React from 'react';
import ThemeToggle from '@/components/calculator/ThemeToggle'; // Import ThemeToggle

export default function Layout({ children, isDark, toggleTheme }) { // Accept isDark and toggleTheme props
  return (
    <div className="min-h-screen">
  
      {children}
    </div>
  );
}