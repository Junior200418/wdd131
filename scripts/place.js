document.addEventListener("DOMContentLoaded", () => {
  const currentTemp = 10;
  const currentWindSpeed = 5;

  const calculateWindChill = (t, v) =>
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16);

  const windChillTarget = document.getElementById("windchill-value");

  if (currentTemp <= 10 && currentWindSpeed > 4.8) {
    const calculatedResult = calculateWindChill(currentTemp, currentWindSpeed);
    windChillTarget.textContent = `${Math.round(calculatedResult)} °C`;
  } else {
    windChillTarget.textContent = "N/A";
  }

  document.getElementById("current-year").textContent =
    new Date().getFullYear();
  document.getElementById("last-modified").textContent = document.lastModified;
});
