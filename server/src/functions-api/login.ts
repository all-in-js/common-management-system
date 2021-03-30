import md5 from 'md5';


interface LoginParams {
  username?: string;
  password?: string;
}
export async function login(cx: KoaContext, vars: LoginParams) {
  const {
    username,
    password
  } = vars;

  if (!username || !password) {
    const {
      code,
      msg
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `${msg}: 'username' and 'password' is expected.`
    }
  }

  const pwdHash = md5(password);
  const user = await cx.$user.findOne({
    username,
    password: pwdHash
  });

  if (user) {
    if (user.using !== 1) {
      const {
        code,
        msg
      } = cx.codes.FORBIDDEN;
      return {
        code,
        msg: `${msg}: 该用户尚未启用`
      };
    }
    const token = cx.$jwt.sign(user);
    await cx.$authRefresh.insertOne({
      createTime: new Date(),
      userId: user._id
    });
    await cx.$auth.insertOne({
      createTime: Date.now(),
      userId: user._id,
      token
    });

    return {
      code: cx.codes.SUCCESS.code,
      msg: '登录成功',
      data: token
    }
  } else {
    const {
      code
    } = cx.codes.INVALID_REQUEST_PARAMS;
    return {
      code,
      msg: `用户名或密码有误`
    }
  }
}
