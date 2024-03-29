const AbstractManager = require("./AbstractManager");

class PictureManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    super({ table: "photos" });
  }

  // The C of CRUD - Create operation

  async create(photo, avatar) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const [result] = await this.database.query(
      `insert into ${this.table} (photo_src, post_date, validation_status, users_id, artwork_id) values (?, ?, ?, ?, ?)`,
      [avatar, currentDate, 0, photo.users_id, photo.artwork_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readAllByUserId(userId) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `SELECT photos.photo_src, photos.post_date, photos.validation_status
      FROM photos
      JOIN users ON photos.users_id = users.id
      WHERE users.id = ?;`,
      [userId]
    );

    // Return the array of items
    return rows;
  }

  async readAllByArtworkId() {
    // Execute the SQL SELECT query to retrieve specific columns from the tables
    const [rows] = await this.database.query(
      `SELECT p.id as photo_id, p.photo_src, p.post_date, p.users_id, a.first_post_date, a.title, a.latitude, a.longitude 
       FROM ${this.table} AS p 
       JOIN artwork AS a ON p.artwork_id = a.id
       WHERE p.validation_status = 1;`
    );

    // Return the array of items
    return rows;
  }

  async readAllByValidationStatus() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `SELECT photos.id, photos.photo_src, photos.validation_status
      FROM photos
      WHERE photos.validation_status = 0;`
    );

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item
  async updateValidationStatus(photoId, validationStatus) {
    // Execute the SQL UPDATE query to modify the validation_status of the photo
    await this.database.query(
      `UPDATE ${this.table} SET validation_status = ? WHERE id = ?`,
      [validationStatus, photoId]
    );
  }
  // ...
}

// The D of CRUD - Delete operation
// TODO: Implement the delete operation to remove an item by its ID

// async delete(id) {
//   ...
// }

module.exports = PictureManager;
