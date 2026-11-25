import "dotenv/config";

import app from "./app";
import prisma from "./utils";

const startServer = async () => {
  try {
    console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

    await prisma.$connect();

    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

  const port = 9000;

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();