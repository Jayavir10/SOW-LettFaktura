const createProductsTable = async (pool) => {
  try {
    await pool.query(`
            Create table if not exists products (
            id serial primary key,
            article_no VARCHAR(50) NOT NULL UNIQUE,
            name VARCHAR(100) not null,
            in_price Numeric(8, 1) NOT NULL,
            price NUMERIC(8, 1) NOT NULL,
            unit VARCHAR(100) NOT NULL,
            in_stock INTEGER DEFAULT 0,
            description TEXT,
            user_id integer not null,
            created_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
        `);

    console.log("Products table created.");
  } catch (error) {
    console.error("Error creating products table:", error);
  }
};

export default createProductsTable;
