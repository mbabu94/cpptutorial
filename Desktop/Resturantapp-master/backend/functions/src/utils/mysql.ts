const mysql = require('promise-mysql');
const mysqlRaw = require('mysql');
const toUnnamed = require('named-placeholders')();

const isDev = process.env.DEV;

let pool;

export default {
  initialize: async function() {
    try {
      pool = await mysql.createPool({
        user: 'discordjs_user01',
        password: 'jTyEUN4lcEwWMN7u',
        database: 'discordjs',
        ...isDev && {
          host: 'localhost',
          port: 3306
        },
        ...!isDev && {
          socketPath: `/cloudsql/tabularasa-145715:us-east1:thingase-sql-2`
        }
      });
      return pool;
    } catch (err) {
      //console.log(err);
    }
  },

  getPool: function() {
    return pool;
  },

  //idempotent
  executeDBQuery: async (query, params) => {
    try {
      const q = toUnnamed(query, params);

      if(isDev) {
        console.log(query);
        console.log(params);
      }

      const connection = await pool.getConnection();
      const results = await connection.query(q[0], q[1]);
      connection.release();

      return results;
    } catch(err) {
			throw err;
    }
  },

  getMysqlRaw(rawStatement) {
    return mysqlRaw.raw(rawStatement);
  }
};