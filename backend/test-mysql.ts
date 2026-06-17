import * as mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bjsoft18_portal'
    });
    console.log('Connected to MySQL successfully!');
    const [rows] = await connection.execute('SHOW TABLES;');
    console.log('Tables:', rows);
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testConnection();
