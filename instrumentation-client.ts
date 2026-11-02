import { initBotId } from "botid/client/core";

// Vercel BotID: an invisible check attached to Ask about Will questions, verified in the route.
initBotId({
  protect: [{ path: "/api/ask", method: "POST" }],
});
