import React from "react";
import Swal from "sweetalert2";

export const showAlert = (text) => {
  Swal.fire({
    text: text,
    icon: "error",
    showCancelButton: false,
    confirmButtonText: "확인",
  });
};

export const showSuccess = (text) => {
  Swal.fire({
    html: text,
    icon: "success",
    showCancelButton: false,
    confirmButtonText: "확인",
  });
};
