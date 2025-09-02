async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("dataDisplay").innerHTML =
      "Hech qanday ma'lumot topilmadi.";
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);


  // Prepare FormData for API
  const formData = new FormData();
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Sana, Soat", formDataObj.SanaSoat);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyrLXuNc9AVcKDBl10GhwHN-TDzUkBFPEu798GSRk0ebWQaymjyLA1orMkujWaPDc8P/exec",
      {
        method: "POST",
        body: formData,
      }
    );
    
    
    if (response.ok) {
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}

// Send data when page loads
window.onload = sendFormData;
