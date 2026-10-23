const pg = require("../../databases/pg");
const TABLES = ['nationalities', 'shelves', 'customers', 'genres', 'authors', 'books', 'orders'];

module.exports = async () => {
    let errors = [];
    const client = pg.generateClient();
    try {
        await client.connect();
    } catch (e) {
        errors.push(e);
        console.error('Cannot connect to database. Check your credentials and DB.');
        console.info('You may want to create table by using command \'npm run db-create\'');
    }

    const isTableExists = async (tableName) => {
        try {
            const query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE "table_name" = $1 AND "table_schema"='public')`;
            const res = await client.query(query, [tableName]);
            if (!res.rows[0].exists) {
                const msg = `Table ${tableName} doesn't exists`;
                console.log(msg);
                errors.push(msg);
            }
        } catch (e) {
            errors.push(e);
            console.error(`Was not able to define table ${tableName} existence due to error.`, e.message);
        }
    }

    for (const tableName of TABLES) {
        await isTableExists(tableName);
    }

    await client.end();

    if (errors.length === 0) console.info('ALL TABLES EXISTS');
}