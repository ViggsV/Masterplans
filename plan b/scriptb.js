    // Array containing random zen-like text messages
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
        "You are a healer"
      ];
  
      // Function to generate a random float text effect
      function createFloatingText() {
        // Create a new element for the floating text
        const textEl = document.createElement('div');
        textEl.classList.add('floating-text');
        
        // Randomly select a text from your zen collection
        const randomText = zenTexts[Math.floor(Math.random() * zenTexts.length)];
        textEl.textContent = randomText;
  
        // Set a random horizontal starting position (ensuring it stays within the viewport)
        const randomLeft = Math.random() * (window.innerWidth - 100); // 100px offset for safe margin
        textEl.style.left = randomLeft + 'px';
        
        // Optionally: randomize font-size or color for variety
        textEl.style.fontSize = (Math.random() * 0.5 + 1.2) + 'rem';
        
        // Append the element to the body
        document.body.appendChild(textEl);
        
        // Remove the element after the animation completes (4 seconds here)
        textEl.addEventListener('animationend', () => {
          textEl.remove();
        });
      }
  
      // Trigger the floating text effect at intervals
      setInterval(createFloatingText, 2000); // every 2 seconds
  