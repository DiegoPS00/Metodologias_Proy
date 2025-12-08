import Swal from "sweetalert2";

export function alertSuccess(message: string) {
  Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: message,
    confirmButtonColor: "#6a00ff",
  });
}

export function alertError(message: string) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#6a00ff",
  });
}

export function alertInfo(message: string) {
  Swal.fire({
    icon: "info",
    title: "Información",
    text: message,
    confirmButtonColor: "#6a00ff",
  });
}

export function confirmAction(message: string) {
  return Swal.fire({
    icon: "warning",
    title: "Confirmar acción",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#6a00ff",
    cancelButtonColor: "#333",
  });
}
