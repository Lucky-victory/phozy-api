import { IAlbumRecord } from "../../interfaces/albums";

export class SQL_Queries {
  static get createUsersTable(): string {
    const query = `CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT,firstname VARCHAR(50) NULL, lastname VARCHAR(50) NULL , username VARCHAR(50) NOT NULL UNIQUE,email VARCHAR(255) NOT NULL UNIQUE,password VARCHAR(255) NOT NULL, created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)) `;
    return query;
  }
  static get createUser(): string {
    const query = `INSERT INTO users VALUES(null,?,?,?,?,?,NOW())`;
    return query;
  }
  static get createAlbum(): string {
    const query = `INSERT INTO albums VALUES(null,?,null,?,NOW(),null)`;
    return query;
  }
  static get createPhoto(): string {
    const query = `INSERT INTO photos VALUES(null,?,?,?,?,?,NOW())`;
    return query;
  }
  static get createAlbumsTable(): string {
    const query = `CREATE TABLE IF NOT EXISTS albums (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(100) NOT NULL DEFAULT 'Untitled', description TINYTEXT NULL ,user_id INT NOT NULL, created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),updated_at TIMESTAMP(6) NULL) `;
    return query;
  }
  static get createPhotosTable(): string {
    const query = `CREATE TABLE IF NOT EXISTS photos (id INT PRIMARY KEY AUTO_INCREMENT,imageUrl VARCHAR(255) NOT NULL,imageAltText VARCHAR(100) NULL , format VARCHAR(10) NULL,albumId INT NULL,user_id INT NOT NULL, created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6))`;
    return query;
  }
  static get findAlbumByTitle(): string {
    const query = `SELECT * FROM albums WHERE title=?`;
    return query;
  }
  static get findAlbumByUser(): string {
    const query = `SELECT user_id FROM albums WHERE id=?`;
    return query;
  }
  static updateAlbum(album: IAlbumRecord): string {
    const keys = [];

    for (const prop in album) {
      keys.push(`\`${prop}\`='?'`);
    }
    const query = `UPDATE albums SET ${keys.join(
      ","
    )},updated_at=NOW() WHERE id = ?`;
    return query;
  }
}

/**
 * use insertId as reference
 */
