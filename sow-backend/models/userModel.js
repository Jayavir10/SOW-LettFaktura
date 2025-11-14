import bcrypt from "bcrypt";

const createUserTable = async (pool) => {
  try {
    
    await pool.query(`
        Create table if not exists users (
        id serial primary key, 
        name varchar(100), 
        email varchar(100) unique, 
        password varchar(100), 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    const result = await pool.query("Select * from users");

    // Inserting a default user if no users exist
    if (result.rows.length === 0) {
      const name = "John Doe";
      const email = "john.doe321@gmail.com";
      const password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "insert into users (name, email, password) values ($1, $2, $3)",
        [name, email, hashedPassword]
      );

      console.log("Default user created");
    }

  } catch (err) {
    console.error("Error creating users table:", err);
  }
};

export default createUserTable;
