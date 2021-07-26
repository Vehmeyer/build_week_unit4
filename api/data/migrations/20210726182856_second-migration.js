exports.up = async (knex) => {
    await knex.schema
        .createTable('roles', (table) => {
            table.increments('role_id')
            table.string('role_name', 200).notNullable()
        })

        .createTable('users', (table) => {
            table.increments('user_id')
            table.string('username', 200).notNullable().unique()
            table.string('password', 200).notNullable()
            table.integer('role_id')
                .unsigned()
                .notNullable()
                .references('role_id')
                .inTable('roles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps(false, true)
        })

        .createTable('classes', (table) => {
            table.increments('class_id')
            table.string('name', 200).notNullable()
            table.string('type', 200).notNullable()
            table.string('date', 200).notNullable()
            table.string('start_time', 200).notNullable()
            table.string('duration', 200).notNullable()
            table.string('intensity_level', 200).notNullable()
            table.string('location', 200).notNullable()
            table.string('number_registered', 200).notNullable()
            table.string('max_size', 200).notNullable()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })

        .createTable('reservations', (table) => {
            table.increments('reservation_id')
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references('class_id')
                .inTable('classes')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');      
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('reservations')
    await knex.schema.dropTableIfExists('classes')
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('roles')
};
