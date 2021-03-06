
/**
 * 系统级：10--
 * 数据级: 20--
 * 业务级：30--
 */
interface IcodeItem {
  code: number;
  msg: string;
}

enum CodesKey {
  UNKNOW = 'UNKNOW',
  SUCCESS = 'SUCCESS',
  INNER_ERROR = 'INNER_ERROR',
  INVALID_PARAMS_TYPE = 'INVALID_PARAMS_TYPE',
  INNERT_ERROR = 'INNERT_ERROR',
  DELETE_ERROR = 'DELETE_ERROR',
  UPDATE_ERROR = 'UPDATE_ERROR',
  QUERY_ERROR = 'QUERY_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_REPEAT = 'RESOURCE_REPEAT',
  INVALID_REQUEST_PARAMS = 'INVALID_REQUEST_PARAMS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN'
}

export type IcodesMap = {
  [key in CodesKey]: IcodeItem;
}

export default function initCodes(app: App) {
  app.context.codes = {
    [CodesKey.SUCCESS]: {
      code: 1000,
      msg: CodesKey.SUCCESS
    },
    [CodesKey.UNKNOW]: {
      code: 1001,
      msg: CodesKey.UNKNOW
    },
    [CodesKey.INNER_ERROR]: {
      code: 1002,
      msg: CodesKey.INNER_ERROR
    },
    [CodesKey.UNAUTHORIZED]: {
      code: 1003,
      msg: CodesKey.UNAUTHORIZED
    },
    [CodesKey.FORBIDDEN]: {
      code: 1004,
      msg: CodesKey.FORBIDDEN
    },
    [CodesKey.INVALID_PARAMS_TYPE]: {
      code: 2001,
      msg: CodesKey.INVALID_PARAMS_TYPE
    },
    [CodesKey.INNERT_ERROR]: {
      code: 2002,
      msg: CodesKey.INNERT_ERROR
    },
    [CodesKey.DELETE_ERROR]: {
      code: 2003,
      msg: CodesKey.DELETE_ERROR
    },
    [CodesKey.UPDATE_ERROR]: {
      code: 2004,
      msg: CodesKey.UPDATE_ERROR
    },
    [CodesKey.QUERY_ERROR]: {
      code: 2005,
      msg: CodesKey.QUERY_ERROR
    },
    [CodesKey.NOT_FOUND]: {
      code: 2006,
      msg: CodesKey.NOT_FOUND
    },
    [CodesKey.RESOURCE_REPEAT]: {
      code: 2007,
      msg: CodesKey.RESOURCE_REPEAT
    },
    [CodesKey.INVALID_REQUEST_PARAMS]: {
      code: 3001,
      msg: CodesKey.INVALID_REQUEST_PARAMS
    }
  };
}
