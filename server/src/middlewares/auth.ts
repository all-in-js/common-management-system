import Koa from 'koa';

export default async function (cx: KoaContext, next: Koa.Next) {
  console.log(cx.path, cx.request.body);
  await next();
}
