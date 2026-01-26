type ModalProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};