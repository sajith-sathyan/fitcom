import bootstrap from "./lib/infrastructure/config/bootstrap.js";
import env from "./lib/infrastructure/config/environment.js";
import createServer from "./lib/infrastructure/webserver/server.js";

const start = async () => {
  try {
    await bootstrap.init();

    const app = await createServer();
    const port = env.PORT || 3005;

    app.listen(port, () => {
      console.log(
        "╔══════════════════════════════════════════════════════════════════╗"
      );
      console.log(
        "║ 🏋️  WORKOUT SERVICE ON AIR!                                       ║"
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
        `║ 🔗 API is live and ready for requests on PORT: ${port}              ║`
      );
      console.log(
        "╚══════════════════════════════════════════════════════════════════╝"
      );
    });
  } catch (err) {
    console.log(err);
  }
};

start();
