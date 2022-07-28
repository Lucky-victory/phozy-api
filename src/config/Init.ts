import db from "./db";

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
          table.string("fullname", 100).notNullable();
          table.string("username", 50).notNullable().unique();
          table
            .timestamp("created_at", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
          table
            .timestamp("updated_at", {
              precision: 6,
            })
            .nullable();
          table.string("password", 255).notNullable();
          table.string("email", 255).notNullable().unique();
          table.string("profile_image").nullable();
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
          table.string("title").notNullable();
          table.string("description").nullable();

          table.integer("privacy", 1).notNullable().defaultTo(0);
          table.integer("user_id").notNullable();
          table
            .timestamp("created_at", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
          table
            .timestamp("updated_at", {
              precision: 6,
            })
            .nullable();
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
          table.integer("album_id").notNullable();
          table.integer("user_id").notNullable();
          table
            .timestamp("created_at", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
          table
            .timestamp("updated_at", {
              precision: 6,
            })
            .nullable();
          table.string("alt_text", 255).nullable();
        });
      }
    })
    .catch((error) => error);

  // create likes table if it doesn't exist yet
  db.schema
    .hasTable("likes")
    .then((exists) => {
      if (!exists) {
        return db.schema.createTable("likes", (table) => {
          table
            .increments("id", {
              primaryKey: true,
            })
            .notNullable();

          table.integer("photo_id").notNullable();
          table.integer("user_id").notNullable();
          table
            .timestamp("created_at", {
              precision: 6,
            })
            .notNullable()
            .defaultTo(db.fn.now(6));
        });
      }
    })
    .catch((error) => error);

  console.log("db initialized");
};
initDB();
export default initDB;
