# PROJECT COMMANDS
```
npm init
npm install pg pg-hstore sequelize sequilize-cli dotenv
npm install nodemon

npx sequelize-cli init
npx sequelize-cli init --config 'src/config/sqlz.js' --migrations-path 'src/migrations/sqlz/' --seeders-path 'src/seeders/sqlz/' --models-path 'src/models/sqlz/' --force
nano practise/7_1-server_db_library_sequelize/server/.sequelizerc
// .sequelizerc
const path = require('path');
module.exports = {
  config: path.resolve('src', 'config', 'sqlz.json'),
  'models-path': path.resolve('src', 'models', 'sqlz'),
  'seeders-path': path.resolve('src', 'seeders', 'sqlz'),
  'migrations-path': path.resolve('src', 'migrations', 'sqlz')
};
nano src/config/sqlz.js

npm install sequelize-auto

## generate models
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t authors
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t books
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t customers
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t genres
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t nationalities
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t orders
npx sequelize-auto -h localhost -d 7_1_server_db_library_sequelize -u postgres -x [password] -p 5432  --dialect postgres -o src/models/sqlz/ -t shelves



npx sequelize-cli migration:generate --name migration-skeleton

npx sequelize db:create

npx sequelize-cli migration:generate --name initial-db


```

#### ####

# INSTALLING
```
npm install --save pg pg-hstore # Postgres
npm install --save mariadb
```

### SEQUELIZE-CLI
for migrations and seeds commands:
```
npm install --save-dev sequelize-cli

npx sequelize-cli init
nano config/config.json

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli migration:generate --name migration-skeleton
```


# CONNECTIONS
```
const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
```


# MODELS

## MODEL DEFINITIONS
sequelize.define() VS class User extends Model {}

#### EXAMPLE 1 (.define)
```
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
```

#### EXAMPLE 2 (extends Model)
```
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
class User extends Model {}
User.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);
// the defined model is the class itself
```


## MODEL METHODS:

.build({someName: value}) - NOT ASYNC. do not save to DB

.save() - save to DB

.create() = build+save

.set({param1,param2}) = Model.param1=param1; Model.param2=param2 + AND OTHER THAT ALREADY BEEN CHANGED

.update(params) - only update specific set of params

.save({ fields: ['name'] }); - update only specific params

.destroy() - remove model from DB

.reload() - update model data from db

.increment('age', { by: 2 }) - update value + returns updated data in Postgresql, unless option { returning: false }

.increment('age')

.increment( {age: 2, cash: 100} );

.decrement()

.toJSON() // JSON.stringify(jane, null, 4));


.drop(); - drop table


## COLUMN OPTIONS
https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options

```
const { Model, DataTypes, Deferrable } = require('sequelize');

class Foo extends Model {}
Foo.init(
  {
    // instantiating will automatically set the flag to true if not set
    flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

    // default values for dates => current time
    myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    // setting allowNull to false will add NOT NULL to the column, which means an error will be
    // thrown from the DB when the query is executed if the column is null. If you want to check that a value
    // is not null before querying the DB, look at the validations section below.
    title: { type: DataTypes.STRING, allowNull: false },

    // Creating two objects with the same value will throw an error. The unique property can be either a
    // boolean, or a string. If you provide the same string for multiple columns, they will form a
    // composite unique key.
    uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
    uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },

    // The unique property is simply a shorthand to create a unique constraint.
    someUnique: { type: DataTypes.STRING, unique: true },

    // Go on reading for further information about primary keys
    identifier: { type: DataTypes.STRING, primaryKey: true },

    // autoIncrement can be used to create auto_incrementing integer columns
    incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

    // You can specify a custom column name via the 'field' attribute:
    fieldWithUnderscores: {
      type: DataTypes.STRING,
      field: 'field_with_underscores',
    },

    // It is possible to create foreign keys:
    bar_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: Bar,

        // This is the column name of the referenced model
        key: 'id',

        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      },
    },

    // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
    commentMe: {
      type: DataTypes.INTEGER,
      comment: 'This is a column name that has a comment',
    },
  },
  {
    sequelize,
    modelName: 'foo',

    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    indexes: [{ unique: true, fields: ['someUnique'] }],
  },
);
```

## DATA_TYPES
https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
```
#### STRING

DataTypes.STRING; // VARCHAR(255)

DataTypes.STRING(1234); // VARCHAR(1234)

DataTypes.STRING.BINARY; // VARCHAR BINARY

DataTypes.TEXT; // TEXT

DataTypes.TEXT('tiny'); // TINYTEXT

DataTypes.CITEXT; // CITEXT          PostgreSQL and SQLite only.

DataTypes.TSVECTOR; // TSVECTOR        PostgreSQL only.

#### BOOLEAN

DataTypes.BOOLEAN; // TINYINT(1)

#### Numbers

DataTypes.INTEGER; // INTEGER

DataTypes.BIGINT; // BIGINT

DataTypes.BIGINT(11); // BIGINT(11)

DataTypes.FLOAT; // FLOAT

DataTypes.FLOAT(11); // FLOAT(11)

DataTypes.FLOAT(11, 10); // FLOAT(11,10)

DataTypes.REAL; // REAL            PostgreSQL only.

DataTypes.REAL(11); // REAL(11)        PostgreSQL only.

DataTypes.REAL(11, 12); // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE; // DOUBLE

DataTypes.DOUBLE(11); // DOUBLE(11)

DataTypes.DOUBLE(11, 10); // DOUBLE(11,10)

DataTypes.DECIMAL; // DECIMAL

DataTypes.DECIMAL(10, 2); // DECIMAL(10,2)

#### Dates

DataTypes.DATE; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres

DataTypes.DATE(6); // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision

DataTypes.DATEONLY; // DATE without time

#### UUIDs

{
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
}
```

## ATTRIBUTES
#### Model Attributes params
{
    type: DataTypes.STRING,
    defaultValue: 'John Doe', // defaultValue: DataTypes.NOW,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    get() {
        const rawValue = this.getDataValue('username');
        return rawValue ? rawValue.toUpperCase() : null;
    },
    set(value) {
        this.setDataValue('password', hash(this.username + value));
    },
    validate: {
        is: /^[0-9a-f]{64}$/i,
    },
    unique: true,
    unique: {
        msg: 'This email address is already in use.' // Custom message for unique constraint
    },
    validate: {
        notNull: {
            msg: 'Email is required.' // Triggers if allowNull is violated
        },
        notEmpty: {
            msg: 'Email cannot be empty.' // Prevents empty strings ""
        },
        isEmail: {
            msg: 'Please provide a valid email address.' // Validates email format
        },
        is: /^[0-9a-zA-Z_+]{1,100}@.[a-z]{2,4}$/i,
    }
}

#### Validation
```
sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // matches this RegExp
      is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
      not: /^[a-z]+$/i,         // does not match this RegExp
      not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (https://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
});
```

#### Model option attributes
{
    sequelize,
    freezeTableName: true,
    tableName: 'Employees',
    timestamps: true, // don't forget to enable timestamps!
    createdAt: false, // I don't want createdAt
    updatedAt: 'updateTimestamp', // I want updatedAt to actually be called updateTimestamp    
}

### global determination on creation
```
const sequelize = new Sequelize('sqlite::memory:', {
    define: {
        freezeTableName: true,
    },
});
```


## SEQUELIZE METHODS

- migrations is for production and .sync is for the quick development

sequelize.sync({ force: true }); - to automatically synchronize all models
sequelize.sync({ force: true, match: /_test$/ });


sequelize.drop(); - To drop all tables:

