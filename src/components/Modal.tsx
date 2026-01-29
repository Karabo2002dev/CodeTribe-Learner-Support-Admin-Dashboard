type ModalProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Modal = ({ message, type, onClose }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-80 rounded-lg shadow-xl p-6 animate-fadeIn"
      >
        <h2
          className={`text-lg font-bold ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "success" ? "Success" : "Error"}
        </h2>

        <p className="mt-2 text-gray-700 text-sm">{message}</p>

        <button
          onClick={onClose}
          className={`mt-4 w-full py-2 rounded-md text-white transition ${
            type === "success"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
