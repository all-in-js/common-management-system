import { MongoClient } from 'mongodb';

export default async function initCollections(app: App, mongoClient: MongoClient) {
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
  app.context.$system = $collection('system');
  app.context.$auth = $collection('auth');

  const authRefresh = $collection('auth-refresh');

  app.context.$authRefresh = authRefresh;
  
  // 设置数据过期时间
  authRefresh.dropIndex('createTime_1');
  
  authRefresh.createIndex({
    createTime: 1
  }, {
    // token 刷新时间
    expireAfterSeconds: 60 * 30
  }, () => {});
}
