const form = document.querySelector("#booking-form");
const status = document.querySelector("#form-status");
const serviceSelect = document.querySelector("#service");
const durationInput = document.querySelector("#duration");

const durations = {
  "Depilación Facial": "30 minutos",
  "Limpieza Facial Profunda": "60 minutos",
  "Masajes Relajantes": "45 minutos",
  "Manicuría & Spa": "40 minutos",
};

const scriptUrl = "https://script.google.com/macros/s/AKfycbwFbUdiT1XJOkDDYSfeILWoQWtRDMab9FqDaXh3ZGNmTZeHjLatjeQ_plTQ8cliNgat/exec";

serviceSelect?.addEventListener("change", (event) => {
  const value = event.target.value;
  if (durationInput) {
    durationInput.value = durations[value] ?? "45 minutos";
  }
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!status) {
    return;
  }

  if (!scriptUrl || scriptUrl.includes("https://script.google.com/macros/s/AKfycbwFbUdiT1XJOkDDYSfeILWoQWtRDMab9FqDaXh3ZGNmTZeHjLatjeQ_plTQ8cliNgat/exec")) {
    status.textContent =
      "Falta configurar la URL del Apps Script para guardar el turno.";
    return;
  }

  status.textContent = "Enviando tu turno...";

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwFbUdiT1XJOkDDYSfeILWoQWtRDMab9FqDaXh3ZGNmTZeHjLatjeQ_plTQ8cliNgat/exec", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar el turno.");
    }

    form.reset();
    if (durationInput) {
      durationInput.value = "45 minutos";
    }
    status.textContent =
      "¡Listo! Recibimos tu solicitud. Te confirmaremos por WhatsApp.";
  } catch (error) {
    status.textContent =
      "No pudimos enviar tu turno. Probá nuevamente o escribinos por WhatsApp.";
  }
});
