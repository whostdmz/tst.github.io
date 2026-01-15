// Theme management
let theme = 0;
try {
  const stored = localStorage.getItem("theme");
  if (stored) theme = stored === "light" ? 1 : 0;
} catch (err) {
  console.log("localStorage not available");
}

document.documentElement.style.setProperty("--theme", theme);

function toggleTheme() {
  theme = theme === 0 ? 1 : 0;
  document.documentElement.style.setProperty("--theme", theme);
  try {
    localStorage.setItem("theme", theme === 1 ? "light" : "dark");
  } catch (err) {
    console.log("localStorage not available");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
});

// Blob follower
function follow(e) {
  const blob = document.getElementById("blob");
  blob.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
}
document.addEventListener("mousemove", follow);

// Slowly rotate --theme-color hue
function colors() {
  setInterval(() => {
    const style = document.documentElement.style;
    const c = getComputedStyle(document.body).getPropertyValue("--theme-color");
    let [h, s, l] = c.substring(4, c.length - 1).split(", ");
    [h, s, l] = [(parseInt(h) + 1) % 360, parseInt(s), l];
    let hsl = `hsl(${h}, ${s}%, ${l})`;
    style.setProperty("--theme-color", hsl);
  }, 100);
}
colors();