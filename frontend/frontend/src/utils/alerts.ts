import Swal from "sweetalert2";

export function alertSuccess(message: string) {
  return Swal.fire({
    icon: "success",
    title: "✔ Éxito",
    text: message,
    background: "#1a1a1a",
    color: "#e8d8ff",
    confirmButtonColor: "#7c2bff",
    confirmButtonText: "Continuar",
    buttonsStyling: true,
    iconColor: "#9f63ff"
  });
}

export function alertError(message: string) {
  return Swal.fire({
    icon: "error",
    title: "✖ Error",
    text: message,
    background: "#1a1a1a",
    color: "#ffc7c7",
    confirmButtonColor: "#ff4d4d",
    iconColor: "#ff4d4d"
  });
}

export function alertInfo(message: string) {
  return Swal.fire({
    icon: "info",
    title: "ℹ Información",
    text: message,
    background: "#1a1a1a",
    color: "#d0caff",
    confirmButtonColor: "#6a00ff",
    iconColor: "#8e37ff"
  });
}

export function confirmAction(message: string) {
  return Swal.fire({
    icon: "warning",
    title: "¿Confirmar?",
    text: message,
    background: "#1a1a1a",
    color: "#fff0f0",
    showCancelButton: true,
    confirmButtonColor: "#7c2bff",
    cancelButtonColor: "#333",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
    iconColor: "#ffb347"
  });
}
