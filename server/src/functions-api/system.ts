
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

/**
 * 模块列表
 */
export async function modules(cx: KoaContext) {
  const mods = await cx.$system.find({}).sort({createTime: -1}).toArray();
  const {
    code
  } = cx.codes.SUCCESS;
  return {
    code,
    data: mods
  }
}