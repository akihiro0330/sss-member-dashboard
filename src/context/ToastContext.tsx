import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useRef,
    useState,
  } from "react";
  
  export type ToastType =
    | "success"
    | "info"
    | "warning"
    | "error";
  
  export type Toast = {
    id: number;
    title: string;
    description?: string;
    type: ToastType;
  };
  
  type ToastOptions = {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
  };
  
  type ToastContextType = {
    toasts: Toast[];
    showToast: (options: ToastOptions) => void;
    dismissToast: (id: number) => void;
  };
  
  const ToastContext =
    createContext<ToastContextType | null>(null);
  
  export function ToastProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const idRef = useRef(0);
  
    const dismissToast = useCallback((id: number) => {
      setToasts((current) =>
        current.filter((toast) => toast.id !== id),
      );
    }, []);
  
    const showToast = useCallback(
      ({
        title,
        description,
        type = "info",
        duration = 4000,
      }: ToastOptions) => {
        idRef.current += 1;
  
        const id = idRef.current;
  
        const toast: Toast = {
          id,
          title,
          description,
          type,
        };
  
        setToasts((current) => {
          const next = [...current, toast];
  
          return next.slice(-4);
        });
  
        window.setTimeout(() => {
          dismissToast(id);
        }, duration);
      },
      [dismissToast],
    );
  
    return (
      <ToastContext.Provider
        value={{
          toasts,
          showToast,
          dismissToast,
        }}
      >
        {children}
      </ToastContext.Provider>
    );
  }
  
  export function useToast() {
    const context = useContext(ToastContext);
  
    if (!context) {
      throw new Error(
        "useToast must be used inside ToastProvider",
      );
    }
  
    return context;
  }