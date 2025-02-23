/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:9DmwkPv3aBdM@ep-misty-butterfly-a5s4m412.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
