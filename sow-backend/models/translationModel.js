const createTranslationTable = async (pool) => {
    try {

        await pool.query(`
            Create table if not exists translations (
            id serial primary key,
            label text not null,
            lang varchar(10) not null,
            value text not null,
            unique(label, lang)
            );`
        );

    } catch (err) {
        console.error("Error creating translations table:", err);
    }
}

export default createTranslationTable;
