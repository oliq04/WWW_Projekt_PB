

function darkMode() {
  const root = document.documentElement;
  const isDark = root.classList.toggle("darkmode");

  localStorage.setItem("darkmode", isDark ? "true" : "false");
}

window.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkmode");
  if (savedMode === "true") {
    document.documentElement.classList.add("darkmode");
  }
});

