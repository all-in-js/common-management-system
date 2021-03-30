
import md5 from 'md5';
import { ObjectID, ObjectQuerySelector, QuerySelector } from 'mongodb';

function randColor() {
  return Math.round(Math.random() * 255);
}
/**
 * 新建用户
 * {
 *  username: 用户名
 *  role: 用户类型，1: 管理员，2: 用户
 *  using: 是否启用
 *  authList: 权限列表
 * }
 */
interface NewUserParams {
  id?: string;
  username?: string;
  password?: string;
  role?: number;
  using?: boolean;
  authList?: string[]
}
export async function addUser(cx: KoaContext, vars: NewUserParams) {
  const {
    id,
    username,
    role,
    using,
    authList
  } = vars;

  if (!username || !(authList && authList.length)) {
    const {
      code,
      msg
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `${msg}: 'username' and 'authList' expected.`,
      data: []
    };
  }

  const user = await cx.$user.findOne({ username });
  let exists: boolean = false;
  if (id) {
    // 编辑
    if (user && !user._id.equals(id)) {
      exists = true;
    }
  } else {
    if (user) {
      exists = true;
    }
  }

  if (exists) {
    const {
      code,
      msg
    } = cx.codes.RESOURCE_REPEAT;
    return {
      code,
      msg: `${msg}: 用户名重复`
    }
  }

  if (id) {
    // 编辑
    await cx.$user.updateOne({
      _id: new ObjectID(id)
    }, {
      $set: {
        username,
        using,
        role,
        authList
      }
    });
  } else {
    // 默认密码为123456
    const pwdHash = md5('123456');
    await cx.$user.insertOne({
      username,
      password: pwdHash,
      role,
      using,
      authList,
      imgColor: `rgb(${randColor()},${randColor()},${randColor()})`,
      createTime: Date.now(),
      creator: ''
    });
  }

  const {
    code
  } = cx.codes.SUCCESS;

  return {
    code,
    msg: `${id ? '编辑' : '新建'}成功`,
    data: []
  };
}

/**
 * 用户列表，
 * 1. 检索条件
 * {
 *  username: 用户名
 *  creator: 创建者
 *  using: 是否启用
 *  role: 用户类型
 * }
 */
interface SearchUserParams {
  username?: string;
  using?: number;
  role?: number;
}
export async function userList(cx: KoaContext, vars: SearchUserParams) {
  const {
    username,
    using,
    role
  } = vars;
  const query: ObjectQuerySelector<SearchUserParams> = {};

  if(username) {
    query.username = {
      $regex: new RegExp(username, 'ig')
    };
  }
  if (using !== undefined && using !== 0) {
    query.using = using as QuerySelector<number>;
  }
  if (role !== undefined && role !== 0) {
    query.role = role as QuerySelector<number>;
  }

  const data = await cx.$user.find(query).sort({createTime: -1}).toArray();

  if (data.length) {
    for(const item of data) {
      const { authList = [] } = item;
      if (authList.length) {
        for (const [ins, authItem] of authList.entries()) {
          const mod = await cx.$system.findOne({ path: authItem });
          authList[ins] = mod;
        }
      }
    }
  }

  const total = await cx.$user.countDocuments(query);

  return {
    code: cx.codes.SUCCESS.code,
    data,
    total
  };
}

/**
 * 删除用户，同时会删除名下图标项目和所有图标
 * {
 *  id: 用户id
 * }
 */
interface DeleteUserParams {
  id?: string;
}
export async function deleteUser(cx: KoaContext, vars: DeleteUserParams) {
  if (!vars.id) {
    const {
      code,
      msg
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `${msg}: 'id' expected.`
    };
  }
  const _id = new ObjectID(vars.id);
  await cx.$user.deleteOne({_id});
  return {
    code: cx.codes.SUCCESS.code,
    msg: '删除成功'
  };
}

/**
 * 切换用户状态
 * {
 *  id: 用户id
 *  newStatus: 新的用户状态
 * }
 */
interface UserStatusParams {
  id: string;
  newStatus: boolean;
}
export async function toggleUserStatus(cx: KoaContext, vars: UserStatusParams) {
  if (!vars.id || vars.newStatus === undefined) {
    const {
      code,
      msg
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `${msg}: 'id' and 'newStatus' expected.`
    };
  }
  await cx.$user.updateOne({_id: new ObjectID(vars.id)}, {$set: {using: vars.newStatus}});
  return {
    code: cx.codes.SUCCESS.code,
    msg: '用户状态修改成功'
  }
}
