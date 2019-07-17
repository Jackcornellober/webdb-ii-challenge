exports.up = function(knex) {
    // we make changes to the db schema
    return knex.schema.createTable('cars', tbl => {
      // add a primary key named id, integer, auto-increment
      tbl.increments();
  
      // other columns
      tbl.integer('VIN')
        .notNullable();
    
      tbl.unique('VIN')
      tbl.string('make', 128)
      .notNullable();
      tbl.string('model', 128)
      .notNullable();
      tbl
        .string('name', 128)
        .unique()
        .notNullable();
      tbl.decimal('mileage')
        .notNullable();
        tbl.string('transmissionType', 128);
        tbl.string('titleStatus', 128);
    });
  };
  
  exports.down = function(knex) {
    // we undo the changes to the db schema
    return knex.schema.dropTableIfExists('cars');
  };
  
  // npx knex init
  // npx knex migrate:make create-cars-table
  // npx knex migrate:up
  
  // npx knex migrate:down to undo one migration at a time
