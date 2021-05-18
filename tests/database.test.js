const {MongoClient} = require('mongodb');
const databaseName = 'photogallery'
const popscript = require('../database/popscript.js');
const database = require('../database/database.js');

describe('databse', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    db = await connection.db('photogallery');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
    done()
  });

  it('should insert a doc into collection', async () => {
    const one = db.collection('1');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await one.insertOne(mockUser);

    const insertedUser = await one.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
    await one.deleteOne({_id: 'some-user-id'});
  });
  
  // TEST
  // it('The 1st collection should have 99 documents', async () => {
  //   const one = db.collection('1');
  //   const result = await one.countDocuments({});
  //   expect(result).toEqual(99);
  // })

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + ' should have 99 documents', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.countDocuments({});
      expect(result).toEqual(99);
    })
  }

});

