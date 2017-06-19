## 鹊桥

鹊桥，木犀接口平台。

### 基本需求

+ 在线新建项目，填写项目路由与虚拟数据。
+ 第一版不需要用户系统。
+ mock数据可以使用API访问，给Ninja提供数据源。

### 技术选型

+ Koa
+ Vuejs
+ MongoDB
+ MUI

### Docs

#### 创建产品

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /products  | POST     |         |

##### POST Data(json)
	{
		"productName":"xueer"
	}
	
-------

#### 产品列表

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /products  | Get      |         |

##### Return Data

	[
	    {
	        "_id": "5901edb9e55e6e1960a04dfb",
	        "kind": "xueer",
	        "__v": 0
	    },
	    {
	        "_id": "5901edd1e55e6e1960a04dfc",
	        "kind": "ccnubox",
	        "__v": 0
	    }
	]

--------

#### 添加产品Mock路由

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /product/:product  | POST      |         |

##### POST Data(json)
	{
	    "url": "/xxx",
	    "description": "xxx",
	    "method":"post",
	    "mock":[{
	    	"name":"xxx",
	    	"id":1
	    },{
	    	"name":"zzz",
	    	"id":2
	    },{
	    	"name":"ccc",
	    	"id":3
	    }]
	}

-----

#### 查看产品Mock路由

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /product/:product  | Get      |         |

##### Return Data
	[
	    {
	        "_id": "59054b53c033f71958ae8f4f",
	        "url": "/lala",
	        "description": "lala",
	        "method": "post",
	        "mock": {
	            "data": "name"
	        },
	        "productId": "5901edb9e55e6e1960a04dfb",
	        "productName": "xueer",
	        "__v": 0
	    },
	    {
	        "_id": "590f3c5ab3ccaa0aa0bfd38e",
	        "url": "/xxx",
	        "description": "xxx",
	        "method": "post",
	        "mock": [
	            {
	                "name": "xxx",
	                "id": 1
	            },
	            {
	                "name": "zzz",
	                "id": 2
	            },
	            {
	                "name": "ccc",
	                "id": 3
	            }
	        ],
	        "productId": "5901edb9e55e6e1960a04dfb",
	        "productName": "xueer",
	        "__v": 0
	    }
	    ...
	]
	
-----

#### 查看所有Mock路由

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /routers | Get      |         |

##### Return Data

(同上)

----

#### 获取mock路由的具体mock data

| URL        | Method   |  Header |
| --------   | -----:   | :----:  |
| /api/:product/:mockRoute | Get      |         |

##### Return Data

	[
	    {
	        "id": 1,
	        "name": "xxx"
	    },
	    {
	        "id": 2,
	        "name": "zzz"
	    },
	    {
	        "id": 3,
	        "name": "ccc"
	    }
	]


