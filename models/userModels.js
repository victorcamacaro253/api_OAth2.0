import { query as _query,pool } from '../db/db.js';


class User{


    static async addUserGoogle({ google_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (google_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [google_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

   static  async addUserFacebook({ facebook_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (facebook_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [facebook_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

   static  async addUserGithub({ github_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (github_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [github_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

    
  static  async addUserTwitter({ twitter_id, nombre, correo, imagen }) {
        const result = await _query('INSERT INTO usuario (twitter_id, nombre, correo, imagen) VALUES (?, ?, ?, ?)',
            [twitter_id, nombre, correo, imagen]
        );
    
     // Ahora, busca el usuario insertado usando su ID
  const insertedUser = await _query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
    
  return insertedUser[0]; // Asegúrate de retornar solo el primer resultado
    }

  static  async findUserByGoogleId(googleId) {
        const query = 'SELECT * FROM usuario WHERE google_id = ?';
        const [rows] = await _query(query, [googleId]);
        return rows;
    }

   static async findUserByFacebookId(facebookId) {
        const query = 'SELECT * FROM usuario WHERE google_id = ?';
        const [rows] = await _query(query, [facebookId]);
        return rows;
    }

   static async findUserByGithubId(githubId) {
        const query = 'SELECT * FROM usuario WHERE github_id = ?';
        const [rows] = await _query(query, [githubId]);
        return rows;
    }

   static  async findUserByTwitterId(twitterId) {
        const query = 'SELECT * FROM usuario WHERE twitter_id = ?';
        const [rows] = await _query(query, [twitterId]);
        return rows;
    }


}

export default User