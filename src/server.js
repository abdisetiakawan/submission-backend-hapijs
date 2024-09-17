const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response({ message: "Hallo abdi setiawan" });
    },
  });

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

// eslint-disable-next-line no-undef
process.on("unhandledRejection", (err) => {
  console.log(err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});

init();
