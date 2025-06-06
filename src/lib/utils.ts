import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Modern color palette
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

// Modern gradients
export const gradients = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
  success: 'bg-gradient-to-r from-success-500 to-success-600',
  warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
  error: 'bg-gradient-to-r from-error-500 to-error-600',
  neutral: 'bg-gradient-to-r from-neutral-500 to-neutral-600',
};

// Modern shadows
export const shadows = {
  sm: 'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]',
  md: 'shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)]',
  lg: 'shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)]',
  xl: 'shadow-[0_12px_32px_-12px_rgba(0,0,0,0.1)]',
};

// Modern animations
export const animations = {
  hover: 'transition-all duration-300 ease-in-out',
  focus: 'transition-all duration-200 ease-in-out',
  active: 'transition-all duration-100 ease-in-out',
};

// Modern glass effect
export const glass = {
  light: 'bg-white/80 backdrop-blur-lg border border-white/20',
  dark: 'bg-black/80 backdrop-blur-lg border border-white/10',
};

// Modern card styles
export const cards = {
  elevated: 'bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition-shadow duration-300',
  glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-md hover:shadow-lg transition-shadow duration-300',
  gradient: 'bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition-shadow duration-300',
};

// Modern button styles
export const buttons = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  success: 'bg-success-500 hover:bg-success-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  warning: 'bg-warning-500 hover:bg-warning-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  error: 'bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md transition-all duration-300',
  outline: 'border-2 border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-500 transition-all duration-300',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-300',
};

// Modern input styles
export const inputs = {
  default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300',
  error: 'bg-white dark:bg-neutral-900 border border-error-500 dark:border-error-500 rounded-lg focus:border-error-500 dark:focus:border-error-500 focus:ring-2 focus:ring-error-500/20 transition-all duration-300',
};

// Modern badge styles
export const badges = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300',
  accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
  success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
  warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
  error: 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300',
  neutral: 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300',
};
