(function () {
  console.log("WhatsApp Heart Favorites script - Candidate Test");

  // Initialize WhatsApp Store access
  function initializeWAStore() {
    // Wait for WhatsApp to initialize its modules
    const storeCheckInterval = setInterval(() => {
      if (window.Store) {
        clearInterval(storeCheckInterval);
        console.log("WhatsApp store already initialized");
        setupReactionListener();
        return;
      }

      if (typeof window.require === "function") {
        try {
          // Load the essential modules
          window.Store = Object.assign({}, window.require("WAWebCollections"));
          window.Store.Cmd = window.require("WAWebCmd").Cmd;

          clearInterval(storeCheckInterval);
          console.log("WhatsApp store initialized");
          setupReactionListener();
        } catch (error) {
          console.error("Error initializing WhatsApp store:", error);
        }
      }
    }, 1000);
  }

  // Set up listeners for heart reactions
  function setupReactionListener() {
    // TODO: Implement the reaction listener here
    //
    // CANDIDATE TASK: Write code that will star a message when you react to it with a heart emoji
    //
    // Hints:
    // 1. You'll need to listen for reaction events using Store.Reactions
    // 2. Check if the reaction is a heart emoji (❤️)
    // 3. Use Store.Msg to get the message object
    // 4. Use Store.Chat to get the chat object
    // 5. Use Store.Cmd.sendStarMsgs to star the message
    //
    // Your code should detect when the user adds a heart reaction and then
    // automatically star that message in the chat
    //
    // TIP: You can inspect WhatsApp modules directly in your Chrome console by typing:
    // require("WAWebCmd") or any other module name. This will show you available methods,
    // _events, and other properties that might be helpful for this task.

    console.log("Reaction listener needs to be implemented");
  }

  // Initialize
  initializeWAStore();
})();
