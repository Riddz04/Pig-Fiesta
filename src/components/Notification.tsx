import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NotificationProps {
  title: string;
  message: string;
  type: "error" | "info" | "success";
  color?: string;
  children?: ReactNode;
}

export function Notification({ title, message, type, color, children }: NotificationProps) {
  const getBgColor = () => {
    if (color) return color;
    
    switch (type) {
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <motion.div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getBgColor()} bg-opacity-95 text-white p-8 rounded-3xl shadow-xl z-50 text-center max-w-md backdrop-blur-sm`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <h2 className="text-3xl mb-4 font-bold text-black">{title}</h2>
      <p className="text-lg text-black font-medium">{message}</p>
      {children}
    </motion.div>
  );
}