// Array containing zen-like text messages
const zenTexts = [
  "Breathe in, breathe out.",
  "Attain peace.",
  "Embrace baldness.",
  "Beyond self, beyond ego.",
  "In stillness lies truth.",
  "Be here now.",
  "Your mind is a garden.",
  "Enlighten others",
  "Harmony in chaos.",
  "Transcend.",
  "Impermenance",
  "You are a healer.",
  "You are healed.",
  "Bald is good.",
  "Your head is so smooth.",
  "I love you.",
];

// Function to generate a random float text effect
function createFloatingText() {
  const textEl = document.createElement("div");
  textEl.classList.add("floating-text");

  // Randomly select a text from your zen collection
  const randomText = zenTexts[Math.floor(Math.random() * zenTexts.length)];
  textEl.textContent = randomText;

  // Set a random horizontal starting position (ensuring it stays within the viewport)
  const randomLeft = Math.random() * (window.innerWidth - 100);
  textEl.style.left = randomLeft + "px";

  // randomize font-size for variety
  textEl.style.fontSize = Math.random() * 0.5 + 1.2 + "rem";

  // Append the element to the body
  document.body.appendChild(textEl);

  // Remove the element after the animation completes
  textEl.addEventListener("animationend", () => {
    textEl.remove();
  });
}

// Trigger the floating text effect at intervals
setInterval(createFloatingText, 2000); // every 2 seconds
