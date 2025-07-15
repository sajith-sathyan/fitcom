import bootstrap from "./lib/infrastructure/config/bootstrap.js";
import env from "./lib/infrastructure/config/environment.js";
import createServer from "./lib/infrastructure/webserver/server.js";

const start = async () => {
  try {
    await bootstrap.init();

    const app = await createServer();
    const port = env.PORT || 3003;

    app.listen(port, () => {
      console.log(
        "╔══════════════════════════════════════════════════════════════════╗"
      );
      console.log(
        "║ 🤖 AI SERVICE IS LIVE!                                           ║"
      );
      console.log(
        "╠══════════════════════════════════════════════════════════════════╣"
      );
      console.log(
        "║       ███████╗██╗████████╗ ██████╗  ██████╗   █████████████╗     ║"
      );
      console.log(
        "║       ██╔════╝██║╚══██╔══╝██╔════╝ ██╔═══██╗  ██╔══██╔══ ██║     ║"
      );
      console.log(
        "║       █████╗  ██║   ██║   ██║      ██║   ██║  ██║  ██║   ██║     ║"
      );
      console.log(
        "║       ██╔══╝  ██║   ██║   ██║      ██║   ██║  ██║  ██║   ██║     ║"
      );
      console.log(
        "║       ██║     ██║   ██║   ╚██████╗  ██████╗   ██║  ██║   ██║     ║"
      );
      console.log(
        "║       ╚═╝     ╚═╝   ╚═╝    ╚═════╝  ╚═════╝   ╚═╝  ╚═╝   ╚═╝     ║"
      );
      console.log(
        "╠══════════════════════════════════════════════════════════════════╣"
      );
      console.log(
        `║ 🔗 API is live and ready for AI magic on PORT: ${port}              ║`
      );
      console.log(
        "╚══════════════════════════════════════════════════════════════════╝"
      );
    });
  } catch (err) {
    console.error("❌ Failed to start AI Service:", err);
  }
};

start();
