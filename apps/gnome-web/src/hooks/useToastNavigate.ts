import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useToastNavigate() {
  const navigate = useNavigate();

  const toastNavigate = (
    path: string,
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
    navigate(path);
  };

  return toastNavigate;
}
