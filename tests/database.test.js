const {MongoClient} = require('mongodb');
const databaseName = 'photogallery'
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
    await db.connection.close();
    await db.close();
    await db.disconnect();
    await server.close();
    knex.destroy();
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

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + ' should have 99 documents', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.countDocuments({});
      expect(result).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be strings', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"userName" : { $type : "string" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be strings', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"created" : { $type : "string" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be strings', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"caption" : { $type : "string" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be numbers', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"helpfulness" : { $type : "number" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be numbers', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"priority" : { $type : "number" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }

  for (var i = 1; i < 99; i++) {
    it('Collection ' + i + '\'s userNames should be arrays', async () => {
      const collection = db.collection(i.toString());
      const result = await collection.find( {"imageUrl" : { $type : "array" } } ).toArray();
      expect(result.length).toEqual(99);
    })
  }
  // All database tests complete

});

