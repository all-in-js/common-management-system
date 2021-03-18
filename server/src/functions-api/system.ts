import MongoDB from 'mongodb';

const existsSystemModule = ['/users', '/system', '/docs'];

interface ModuleParams {
  name?: string;
  path?: string;
  using?: number;
}
/**
 * 新建系统模块
 */
export async function addModule(cx: KoaContext, vars: ModuleParams) {
  let {
    name,
    path = '',
    using = 1
  } = vars;

  if (!name || !path) {
    const {
      code,
      msg
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `${msg}: 'name' and 'path' expected.`
    };
  }

  // 补全路径
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  const mod = await cx.$system.findOne({ path });
  if (mod || existsSystemModule.includes(path)) {
    const {
      code,
      msg
    } = cx.codes.RESOURCE_REPEAT;
    return {
      code,
      msg: `${msg}: 已存在该系统路径`
    }
  }

  // 新增数据
  await cx.$system.insertOne({
    name,
    path,
    using,
    createTime: Date.now()
  });

  const {
    code
  } = cx.codes.SUCCESS;
  return {
    code,
    msg: '模块新建成功'
  } 
}

interface SearchModulesParams {
  pageSize?: number;
  pageNo?: number;
  name?: string;
  using?: number;
}
/**
 * 模块列表
 */
export async function modules(cx: KoaContext, vars: SearchModulesParams) {
  const {
    pageSize = 10,
    pageNo = 1,
    name,
    using
  } = vars;
  const query: MongoDB.ObjectQuerySelector<SearchModulesParams> = {};
  if (name !== undefined && name !== '') {
    query.name = {
      $regex: new RegExp(name, 'ig')
    };
  }
  if (using !== undefined && using !== 0) {
    query.using = using as MongoDB.QuerySelector<number>;
  }

  const total = await cx.$system.countDocuments(query);
  const mods = await cx.$system.find(query).sort({createTime: -1}).limit(pageSize).skip((pageNo - 1) * pageSize).toArray();
  
  const {
    code
  } = cx.codes.SUCCESS;
  return {
    code,
    total,
    data: mods
  }
}