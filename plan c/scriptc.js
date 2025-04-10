  // Key for localStorage
  const STORAGE_KEY = 'terminalCommands';

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
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    line.className = 'line';
    line.textContent = text;
    terminal.appendChild(line);
    // Auto-scroll to the bottom to reveal new entries
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Load and render any previously stored commands on page load
  const commands = loadCommands();
  commands.forEach(cmd => {
    appendLine(cmd);
  });

  // Submit a new command: render it, store it, and clear the input field
  function submitCommand() {
    const input = document.getElementById('commandInput');
    const command = input.value.trim();
    if (command === "") return;
    appendLine(command);
    commands.push(command);
    saveCommands(commands);
    input.value = "";
  }

  // Allow submitting via Enter key
  document.getElementById('commandInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      submitCommand();
    }
  });