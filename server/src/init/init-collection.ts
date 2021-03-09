import { MongoClient } from 'mongodb';

export default function initCollections(app: App, mongoClient: MongoClient) {
  /**
   * 初始化collection
   */
  const $collection = (col: string) => {
    return mongoClient.db(app.context.db_env.DB_DATABASE).collection(col);
  }
  app.context.$collection = $collection;
  /**
   * user model
   */
  app.context.$user = $collection('users');
}
