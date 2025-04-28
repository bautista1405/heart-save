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

    const reactionInterval = setInterval(() => {
      clearInterval(reactionInterval);
      if (window.Store && window.Store.Reactions) {
        window.Store.Reactions.on('add', async (reaction) => {

          //get msg Store
          const msgStore = window.Store.Msg;

          //get chat Store
          const chatStore = window.Store.Chat;

          console.log('msg store: ', msgStore);
          console.log('chat store: ', chatStore);
          console.log('reaction: ', reaction);

          //get emoji
          const emoji = reaction?.__x_reactionByMe?.reactionText;
          console.log('emoji:', emoji);

          //get chat id where reaction took place
          const chatId = reaction.__x_id.remote._serialized;
          console.log('chat id: ', chatId);

          //get msgs by chat 
          const chatMsgs = msgStore.byChat(chatId);
          console.log('chat msgs: ', chatMsgs);

          //reacted msg id: 6A4739C551DCB102EC3291A47398D1FA

          const msgIds = chatMsgs._models.map(msg => msg.__x_id.id);
          // console.log('msg Ids: ', msgIds);

          const filteredMsgId = msgIds.filter(msg => msg === '6A4739C551DCB102EC3291A47398D1FA');
          console.log('filtered msg id: ', filteredMsgId);

          if (emoji === '❤️') {
            try {
              //which arguments does this function take?
              //wasn't able to find it on Store.Cmd, could it be somewhere else?
              const starMsg = await window.Store.Cmd.sendStarMsgs(chatId, filteredMsgId);
              console.log('star msg: ', starMsg);
            } catch (error) {
              console.log('Error: ', error)
            }
          }
        })
      }
    }, 2000)

    console.log("Reaction listener needs to be implemented");
  }

  // Initialize
  initializeWAStore();
})();
