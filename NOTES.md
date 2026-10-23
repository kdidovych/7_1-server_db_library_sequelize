Q1: sequelize... always using "Severity: high" issued modules like uuid and lodash :(
(dottie, uuid, validator and lodash)


Q2: Why class from lower case?
  class shop extends Model {


Q3: why class is described inside function? (very bad practise in php and OOP)
practise/0_6_Yan_HomeAccounting/server/src/db/models/item.js


Q4: do we need 'use strict'; ?
practise/0_6_Yan_HomeAccounting/server/src/db/models/item.js
No "use strict" in whole "9_freshctc_toolkit-exam-project-2025-01" project


N1: reserved keys like "fields". What other words is there?
https://sequelize.org/docs/v6/core-concepts/model-instances/
await jane.save({ fields: ['name'] });


Q5.https://sequelize.org/docs/v6/core-concepts/model-instances/
How it knows that data was not updated in db with some other request?
The save method is optimized internally to only update fields that really changed. This means that if you don't change anything and call save, Sequelize will know that the save is superfluous and do nothing, i.e., no query will be generated (it will still return a Promise, but it will resolve immediately).
Also, if only a few attributes have changed when you call save, only those fields will be sent in the UPDATE query, to improve performance.


N2: Does dotenv support objects?
No, dotenv (and environment variables in general) does not natively support complex JavaScript objects or arrays.
How dotenv Works
• Key-Value Strings Only: Environment variables are strictly stored and parsed as flat key-value pairs of strings (e.g., NAME=value).
• No Nesting: You cannot define nested objects, arrays, or booleans directly in a standard .env file (e.g., USER={ name: "John" } will just be parsed as a literal string "{ name: 'John' }").


Q6: why we pass a constant as second param if we can get it in model itself?
const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);


Q7: Each require call, sequelize will create new instance and update existing models it stores. Why we are not checking
is it already exists in sequelize.models.shop and return from there?
```
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    ...
  }
  shop.init({
    ...
  }, {
    sequelize,
    modelName: 'shop',
  });
  return shop;
};
```


N3: In task next tables were listed, however (countries <> nationalities)
 authors, genres, countries, shelves, customers, orders, books.


Q8: I have 2 db (mysql + postgre), how to use migrations (siquelize-cli) in that case?


N4: I started this task from creating own Models by documentations, not by using generating cli commands


N5: 'use strict'; is presented in generated migration file


N6: passing DataTypes as we can provide own datatypes to sequelize


Q9: Why in Models we have createdAt located in options, while in migrations we should point them in ATTRIBUTES?
Why I have to duplicate all columns in migration after I created Model?


Q10: How t oread what is going on in init function of Model?


Q11: Why there is no create migration command by provided Model file?


N7: Looks like init is a static function (should be), or how then "new" may be called on object, not on class?
User.init() is not creating an object, it populate sequelize with instance/class User
```
// Valid
class User extends Model {
  declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize },
);
const user = new User({ id: 1 });
user.id; // 1
```
YES
```
You can view Sequelize’s init implementation in:
server/node_modules/sequelize/lib/model.js, around line 660.
It’s declared as static init(attributes, options = {}) on Sequelize’s Model class, so User.init(...) runs with this referring to User. In your model, it configures the class with its attributes and options, registers it with Sequelize, and returns the class.
```
2746 rows in file - who wrote it?
server/node_modules/sequelize/lib/model.js

И получается каждий раз происходит инит
db[ 'Offers' ].belongsTo(db[ 'Users' ],
    { foreignKey: 'userId', sourceKey: 'id' });
db[ 'Offers' ].belongsTo(db[ 'Contests' ],
    { foreignKey: 'contestId', sourceKey: 'id' });
db[ 'Offers' ].hasOne(db[ 'Ratings' ],
    { foreignKey: 'offerId', targetKey: 'id' });


Q12: How in static method class variable can be used?
practise/7_1-Server_DB_Library_with_sequelize/server/node_modules/sequelize/lib/model.js
  static init(attributes, options = {}) {
    if (!options.sequelize) {
      throw new Error("No Sequelize instance passed");
    }
    this.sequelize = options.sequelize;
    const globalOptions = this.sequelize.options;

HOW THIS WORKS?
  get sequelize() {
    return this.constructor.sequelize;
  }
SET TIMEOUT IN CONSTRUCTOR!!!
  setTimeout(() => {
          const overwrittenAttributes = [];
          ...},
          0
      }


Q13: npm install sequilize-cli do not install sequelize, even if it point in dependencies. Why?


N8: in final project. What as for Windows path slashes? :D
module.exports = {
  'config': path.resolve('./src/config', 'postgresConfig.json'),
  'models-path': path.resolve('./src/models'),


Q14: How to diferentiate bussnes Models vs sequelize models? What is about collections?


Q15: Why this command do not create config file to point to models, migrations, seeds and config folder?
```
npx sequelize-cli init --config 'src/config/sequelize.json' --migrations-path 'src/migrations/sqlz/' --seeders-path 'src/seeders/sqlz/' --models-path 'src/models/sqlz/'
```


N9: review https://github.com/sequelize/

https://github.com/sequelize/sequelize-auto
https://github.com/sequelize/website


Q16: Again? (what is going on in the last 3 rows. WHY??? WHY???)
practise/7_1-server_db_library_sequelize/server/src/models/sqlz/init-models.js
function initModels(sequelize) {
  var shelves = _shelves(sequelize, DataTypes);
  return {
    shelves,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;


Q17:
sequelize-auto creates file init-models.js in models folder while sequelize creates index.js, which will cause error future
both modules usage is not working by default without additional manual fixes

N18: in exam project, how sequelize cli are used if they use json instead of dotenv?
  'config': path.resolve('./src/config', 'postgresConfig.json'),

N19: index.js hardcoded config file path, so when you change it later in config - it will not work anymore
const config = require(__dirname + '/../../config/sqlz.json')[env];


N20: password in sequelize object stored in public way. Any variable log will show it

Q18: sequence of table to add and delete are reverse. How to deal with that when each table has separate migration file?

N21: Using async/await inside an Array.prototype.forEach loop does not work as expected because forEach is completely synchronous.
 It fires off all the async operations at the same time,

Q19: nodemon is holding connection. How to end it?

Q20: How to execute async function with await without making parent function async, but having waiting for the result?

N22: download rate recently drops from 3,2M to 966k
https://www.npmjs.com/package/sequelize


N23: require + import in sequelize v7
https://github.com/sequelize/sequelize/blob/v7.0.0-alpha.48/packages/core/src/utils/validator-extras.js
https://www.google.com/search?q=node+js+why+in+some+files+are+used+%27require%27+and+in+other+%27import%27%3F&oq=node+js+why+in+some+files+are+used+%27require%27+and+in+other+%27import%27%3F&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCjMwNTE4ajBqMTWoAgiwAgE&sourceid=chrome&source=chrome.rb&ie=UTF-8