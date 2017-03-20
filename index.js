'use strict';
const koa = require('koa');
const mongo = require('koa-mongo');
const Model = require('./model');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

app.use(mongo());
app.use(router.routes());
app.use((ctx, next) => {
  ctx.database = ctx.mongo.db("test");
  next();
});

router
  .get('/', async (ctx, next) => {
  	const user = new Model(ctx.mongo.db("test"), "User");
    const result = await user.insertOne({username: "hahahha"});
    ctx.body = result;
  })
  .get('/users/:id', async (ctx, next) => {
  	const id = ctx.params.id;
  	const user = new Model(ctx.mongo.db("test"), "User");
    const result = await user.findOneById(id);
    ctx.body = result;
  })
  .post('/users', function (ctx, next) {
    // ...
  })
  .put('/users/:id', function (ctx, next) {
    // ...
  })
  .del('/users/:id', function (ctx, next) {
    // ...
  })
  .all('/users/:id', function (ctx, next) {
    // ...
  });


app.listen(3000, () => {
  console.log('listening on port 3000');
});