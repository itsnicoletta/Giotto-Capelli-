const menu = document.querySelector("nav");
const links = [...menu.querySelectorAll('a[href^="#"]')];
const sections = links.map((link) => document.getElementById(link.hash.slice(1)));

function updateCurrentSection() {
  const marker = menu.getBoundingClientRect().bottom + 24;
  let current = sections.findLastIndex((section) => section.getBoundingClientRect().top <= marker);
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sections.length - 1;
  }

  links.forEach((link, index) => {
    if (index === Math.max(0, current)) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", updateCurrentSection, { passive: true });
window.addEventListener("resize", updateCurrentSection);
updateCurrentSection();

document.querySelectorAll(".clip video").forEach((video) => {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", "Riproduci " + video.getAttribute("aria-label"));
  video.controls = false;
  video.after(button);
  button.addEventListener("click", () => {
    document.querySelectorAll("video").forEach((other) => {
      if (other !== video) other.pause();
    });
    video.controls = true;
    button.remove();
    video.focus();
    video.play().catch(() => {});
  });
});
