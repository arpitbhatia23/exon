import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Exon API",
      version: "1.0.0",
      description: "API documentation generated automatically",
    },
    servers: [
      {
        url: `http://localhost:${process.env.port}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 👈 auto-scan routes
});
