type ModalProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Modal = ({ message, type, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        
        
        <h2 className={`text-lg font-bold ${type === "success" ? "text-green-600" : "text-red-600"}`}>
          {type === "success" ? "Success" : "Error"}
        </h2>

       

       
         
      </div>
    </div>
  );
};

export default Modal;