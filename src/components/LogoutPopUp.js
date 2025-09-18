import React from "react";

const LogoutPopUp = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onCancel}
    >
      <div
        className="bg-primary shadow-lg p-6 w-80 max-w-full z-60"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
