import db from "../db";

const initDB = () => {
  // create users table if it doesn't exist yet
  db.schema
    .hasTable("users")
    .then((exists) => {
      if (!exists) {
        return db.schema.createTable("users", (table) => {
          table
            .increments("id", {
              primaryKey: true,
            })
            .notNullable();
          table.string("firstname", 100).notNullable();
          table.string("lastname", 100).nullable();
          table.string("username", 50).notNullable().unique();
          table
            .timestamp("createdAt", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
          table
            .timestamp("updatedAt", {
              precision: 6,
            })
            .nullable();
          table.string("password", 255).notNullable();
          table.string("email", 255).notNullable().unique();
          table.string("profileImage", 1024).nullable();
        });
      }
    })
    .catch((error) => error);
  // create albums table if it doesn't exist yet
  db.schema
    .hasTable("albums")
    .then((exists) => {
      if (!exists) {
        return db.schema.createTable("albums", (table) => {
          table
            .increments("id", {
              primaryKey: true,
            })
            .notNullable();
          table.string("title").notNullable().defaultTo("untitled");
          table.string("description").nullable();
          table.string("coverImage").nullable();
          table.boolean("private").notNullable().defaultTo(false);
          table.integer("userId").notNullable();
          table
            .timestamp("createdAt", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
        });
      }
    })
    .catch((error) => error);

  // create photos table if it doesn't exist yet
  db.schema
    .hasTable("photos")
    .then((exists) => {
      if (!exists) {
        return db.schema.createTable("photos", (table) => {
          table
            .increments("id", {
              primaryKey: true,
            })
            .notNullable();
          table.string("url", 1024).notNullable();
          table
            .timestamp("createdAt", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
          table
            .timestamp("updatedAt", {
              precision: 6,
            })
            .nullable();
          table.string("altText", 255).nullable();
        });
      }
    })
    .catch((error) => error);

  console.log("db initialized");
};
initDB();
export default initDB;
