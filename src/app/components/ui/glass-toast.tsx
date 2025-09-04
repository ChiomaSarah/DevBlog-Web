"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { GlassToastProps } from "@/app/interfaces";

export const GlassToast: React.FC<GlassToastProps> = ({
  message,
  description,
  type = "success",
  duration = 5000,
  isVisible,
  onClose,
  position = "top-right",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      setIsClosing(false);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 500);
  };

  if (!isMounted) return null;

  // Configurations for different toast types.
  const toastConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-white",
      iconColor: "text-green-600",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      textColor: "text-white",
      iconColor: "text-red-600",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-white",
      iconColor: "text-amber-600",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-white",
      iconColor: "text-blue-600",
    },
  };

  const {
    icon: Icon,
    bgColor,
    borderColor,
    textColor,
    iconColor,
  } = toastConfig[type];

  // Position classes.
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  // Animation classes based on position.
  const getAnimationClasses = () => {
    if (position.includes("bottom")) {
      return {
        enter: "animate-in slide-in-from-bottom fade-in-80",
        exit: "animate-out slide-out-to-bottom fade-out-80",
      };
    } else {
      return {
        enter: "animate-in slide-in-from-top fade-in-80",
        exit: "animate-out slide-out-to-top fade-out-80",
      };
    }
  };

  const animation = getAnimationClasses();

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div
        className={`${isClosing ? animation.exit : animation.enter} 
        backdrop-blur-lg rounded-xl p-4 shadow-xl border ${borderColor} ${bgColor} 
        transition-all duration-300 min-w-[300px] max-w-md`}
      >
        <div className="flex items-start space-x-3">
          <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
          <div className="flex-1">
            <p className={`font-medium ${textColor}`}>{message}</p>
            {description && (
              <p className={`text-sm mt-1 ${textColor} opacity-90`}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className={`text-gray-500 hover:text-gray-700 transition-colors ${textColor} hover:opacity-70`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="w-full bg-white/20 rounded-full h-1 mt-3">
            <div
              className={`h-1 rounded-full ${bgColor
                .replace("bg-", "bg-")
                .replace(
                  "/20",
                  "/60"
                )} transition-all duration-${duration} ease-linear`}
              style={{
                animation: `progressBar ${duration}ms linear forwards`,
                animationPlayState: isClosing ? "paused" : "running",
              }}
            />
          </div>
        )}

        <style jsx>{`
          @keyframes progressBar {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
