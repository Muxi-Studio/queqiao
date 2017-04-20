'use strict';
const koa = require('koa');
const mongo = require('koa-mongo');
const Products = require('./model/products.js');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new koa();
const router = new Router();

app.use(mongo());
app.use(bodyParser());
app.use(router.routes());
app.use((ctx, next) => {
  ctx.database = ctx.mongo.db("test");
  next();
});

router
  .get('/', async (ctx, next) => {
    ctx.body = "hello"
  })
  .get('/products', async (ctx, next) => {
    const products = new Products(ctx.mongo.db("test"), "Products");
    const result = await products.findAll();
    ctx.body = result;
  })
  .post('/products', async (ctx, next) => {
    const product = ctx.request.body.kind;
    const products = new Products(ctx.mongo.db("test"), "Products");
    const result = await products.insertOne({product: product});
    ctx.body = result;
  })  
  .get('/product/:name', async (ctx, next) => {
    const name = ctx.params.name;
    const product = new Products(ctx.mongo.db("test"), "Products");
    const result = await product.findOneByName(name);
    ctx.body = result;
  })
  .post('/product/:name', async (ctx, next) => {
    const name = ctx.params.name;
    const product = new Products(ctx.mongo.db("test"), "Products");
    const result = await user.findOneById(name);
    ctx.body = result;
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