import React, { useState, useEffect, useState as useReactState } from "react";
import { Lock, X } from "lucide-react";

interface SetPinModalProps {
  onSetPin: (pin: string) => void;
  onClose: () => void;
}

const SetPinModal: React.FC<SetPinModalProps> = ({ onSetPin, onClose }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState("");
  const [isPinSet, setIsPinSet] = useReactState(false);

  useEffect(() => {
    const pinStatus = sessionStorage.getItem("isPinSet");
    setIsPinSet(pinStatus === "true");
  }, []);

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = isConfirm ? [...confirmPin] : [...pin];
    newPin[index] = value;

    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(
        isConfirm ? `confirm-pin-${index + 1}` : `pin-${index + 1}`
      );
      nextInput?.focus();
    }

    // Clear errors
    setErrors("");
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    isConfirm = false
  ) => {
    if (
      e.key === "Backspace" &&
      !(e.currentTarget as HTMLInputElement).value &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        isConfirm ? `confirm-pin-${index - 1}` : `pin-${index - 1}`
      );
      prevInput?.focus();
    }
    // Submit on Enter if all digits are filled
    if (e.key === "Enter") {
      if (!isConfirm && pin.join("").length === 4 && step === 1) {
        handleContinue();
      } else if (isConfirm && confirmPin.join("").length === 4 && step === 2) {
        handleConfirm();
      }
    }
  };

  const handleContinue = () => {
    const pinString = pin.join("");

    if (pinString.length !== 4) {
      setErrors("Please enter a 4-digit PIN");
      return;
    }

    setStep(2);
    setErrors("");

    // Focus first confirm input
    setTimeout(() => {
      document.getElementById("confirm-pin-0")?.focus();
    }, 100);
  };

  const handleConfirm = () => {
    const pinString = pin.join("");
    const confirmPinString = confirmPin.join("");

    if (confirmPinString.length !== 4) {
      setErrors("Please enter your 4-digit PIN");
      return;
    }

    if (pinString !== confirmPinString) {
      setErrors("PINs do not match. Please try again.");
      setConfirmPin(["", "", "", ""]);
      setTimeout(() => {
        document.getElementById("confirm-pin-0")?.focus();
      }, 100);
      return;
    }

    // Save PIN status in sessionStorage
    sessionStorage.setItem("isPinSet", "true");
    sessionStorage.setItem("userPin", pinString);
    onSetPin(pinString);
  };

  const renderPinInputs = (
    pinArray: string[],
    prefix: string,
    isConfirm = false
  ) => (
    <div className="flex justify-center space-x-4 mb-6">
      {pinArray.map((digit, index) => (
        <input
          key={index}
          id={`${prefix}-${index}`}
          type="password"
          maxLength={1}
          value={digit}
          onChange={(e) => handlePinChange(index, e.target.value, isConfirm)}
          onKeyDown={(e) => handleKeyDown(index, e, isConfirm)}
          className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-[#13070C] focus:ring-2 focus:ring-[#13070C] focus:ring-opacity-20 transition-all"
        />
      ))}
    </div>
  );

  if (isPinSet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#13070C]">
            {step === 1 ? "Set Transaction PIN" : "Confirm PIN"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#EFF9F0] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#13070C]" />
          </div>
          <p className="text-gray-600">
            {step === 1
              ? "Create a 4-digit PIN to secure your transactions"
              : "Re-enter your PIN to confirm"}
          </p>
        </div>

        {step === 1 ? (
          <>
            {renderPinInputs(pin, "pin")}

            {errors && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center mb-6">
                {errors}
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={pin.join("").length !== 4}
              className="w-full bg-[#13070C] text-white py-4 px-4 rounded-2xl font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#13070C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            {renderPinInputs(confirmPin, "confirm-pin", true)}

            {errors && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center mb-6">
                {errors}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setStep(1);
                  setConfirmPin(["", "", "", ""]);
                  setErrors("");
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-4 rounded-2xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmPin.join("").length !== 4}
                className="flex-1 bg-[#13070C] text-white py-4 px-4 rounded-2xl font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#13070C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Confirm PIN
              </button>
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Keep your PIN secure and don't share it with anyone
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPinModal;
