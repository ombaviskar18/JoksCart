import React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type JToastVariant = 'success' | 'info' | 'warning' | 'error';

type JToastConfig = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  iconClassName: string;
};

const TOAST_THEME: Record<JToastVariant, JToastConfig> = {
  success: {
    title: 'Operation completed!',
    icon: CheckCircle2,
    className:
      'border-emerald-400/35 bg-emerald-950/85 text-emerald-50 before:bg-emerald-400',
    iconClassName: 'text-emerald-300',
  },
  info: {
    title: 'Here is some information.',
    icon: Info,
    className: 'border-blue-400/35 bg-blue-950/85 text-blue-50 before:bg-blue-400',
    iconClassName: 'text-blue-300',
  },
  warning: {
    title: 'Please be careful!',
    icon: AlertTriangle,
    className:
      'border-amber-400/35 bg-amber-950/90 text-amber-50 before:bg-amber-400',
    iconClassName: 'text-amber-300',
  },
  error: {
    title: 'Something went wrong!',
    icon: XCircle,
    className: 'border-rose-400/35 bg-rose-950/90 text-rose-50 before:bg-rose-400',
    iconClassName: 'text-rose-300',
  },
};

type ShowJToastOptions = {
  variant: JToastVariant;
  title?: string;
  description?: string;
  duration?: number;
};

export function showJToast({
  variant,
  title,
  description,
  duration = 2600,
}: ShowJToastOptions) {
  const config = TOAST_THEME[variant];
  const Icon = config.icon;

  toast({
    duration,
    className: cn(
      'relative rounded-xl border pl-5 pr-10 py-4 shadow-2xl backdrop-blur-md before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1',
      config.className,
    ),
    title: (
      <div className="flex items-center gap-3">
        <Icon className={cn('h-5 w-5 shrink-0', config.iconClassName)} />
        <span className="text-sm font-semibold tracking-wide">
          {title ?? config.title}
        </span>
      </div>
    ),
    description: description ? (
      <p className="pl-8 text-xs text-current/85">{description}</p>
    ) : undefined,
  });
}

export const jtoast = {
  success: (title: string, description?: string) =>
    showJToast({ variant: 'success', title, description }),
  info: (title: string, description?: string) =>
    showJToast({ variant: 'info', title, description }),
  warning: (title: string, description?: string) =>
    showJToast({ variant: 'warning', title, description }),
  error: (title: string, description?: string) =>
    showJToast({ variant: 'error', title, description }),
  productAdded: (productName?: string) =>
    showJToast({
      variant: 'success',
      title: 'Product added to cart',
      description: productName ? `${productName} is ready in your cart.` : undefined,
    }),
  orderPlaced: () =>
    showJToast({
      variant: 'info',
      title: 'Order placed',
      description: 'Your order was submitted successfully.',
    }),
  userLogout: () =>
    showJToast({
      variant: 'warning',
      title: 'User logout',
      description: 'You have been logged out from your account.',
    }),
};
