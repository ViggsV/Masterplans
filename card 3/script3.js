  // Key for localStorage
  const STORAGE_KEY = "terminalCommands";

  // Load commands from localStorage
  function loadCommands() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing stored commands:", error);
      }
    }
    return [];
  }

  // Save commands to localStorage
  function saveCommands(commands) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(commands));
  }

  // Append a new line to the terminal container
  function appendLine(text) {
    const terminal = document.getElementById("terminal");
    const line = document.createElement("div");
    line.className = "block py-1 break-words whitespace-pre-wrap";
    line.textContent = text;
    terminal.appendChild(line);
    // Auto-scroll to the bottom to reveal new entries

    // Delay to allow reflow before scrolling
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 0);
  }

  // Load and render any previously stored commands on page load
  const commands = loadCommands();
  commands.forEach((cmd) => {
    appendLine(cmd);
  });

  // Submit a new command: render it, store it, and clear the input field
  function submitCommand() {
    const input = document.getElementById("commandInput");
    const command = input.value.trim();
    if (command === "") return;
    launchConfetti();
    appendLine(command);
    commands.push(command);
    saveCommands(commands);
    input.value = "";
  }

  // Allow submitting via Enter key
  document
    .getElementById("commandInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        submitCommand();
      }
    });


function launchConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
