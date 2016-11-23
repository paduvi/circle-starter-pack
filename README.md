# Tech Payroll

### Cấu trúc folder:
- config: 
    - Cấu hình global: `config.js`
    - Cấu hình theo môi trường: nằm ở `env/{env}.js`
    - Kết nối database: `database.js`, có thể kết nối 1 lúc nhiều database cũng được
- controller:
    - socket: <tạm bỏ qua> đợi thống nhất dùng zmq hay kafka
    - web: cung cấp các REST API
- dao: viết các function để xử lý logic
- test: thư mục viết test

### Chi tiết controller:

Các route sẽ được khai báo bên trong các file `controller/{controllerName}/route.js`.
Prefix URL được khai báo trong config.js, mặc định nếu không khai báo thì sẽ lấy giá trị là `''`

Ví dụ route `controller/online-course/route.js` + prefix là `'/api'`:

```javascript
        "/complete-video": {
            get: {
                handler: online.completeVideo,
                middleware: [], // optional
                cors: [] //optional
            }
        }
```

-> Đường dẫn tương ứng: `/api/online-course/complete-video`
-> Hàm trên sẽ tương ứng với lệnh `app.get('/api/online-course/complete-video', [], online.completeVideo)` trong express
-> Danh sách các middleware mình khai báo ở trong phần `middleware` (optional)
-> Danh sách các IP cho phép truy cập vào mình khai báo ở phần `cors` (optional, mặc định là tất cả các ip đều được cho phép). Chi tiết xem trong cấu hình `origin` của thằng [cors](/api/online-course/complete-video)

### Chi tiết database:

Phần database thay vì fix cứng dùng Sequelize như của Arrowjs.io thì mình sẽ để tự config thoải mái, rồi trả về 1 Promise return ra dbConnection bên trong file `config/database.js`

Ví dụ dùng MongoDB:

```javascript
var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

module.exports = function (app) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(`mongodb://${app.config.db.host}/${app.config.db.name}`, function (err, dbConnection) {
            if (err)
                return reject(err);
            resolve(dbConnection);
        });
    })
}
```
-> Gọi tới db bằng lệnh `app.db`

Ví dụ sử dụng nhiều DB 1 lúc:

```javascript
var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

module.exports = function (app) {
    return Promise.all([
        connectMongo(app),
        connectPostgres(app)
    ]).then(function (results) {
        return {
            mongo: results[0],
            postgres: results[1]
        }
    })
}

function connectMongo(app) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(`mongodb://${app.config.db.mongo.host}/${app.config.db.mongo.name}`, function (err, dbConnection) {
            if (err)
                return reject(err);
            resolve(dbConnection);
        });
    })
}

function connectPostgres(app) {
    return Promise.resolve().then(function () {
        // Dùng Sequelize;
        return {}
    })
}
```
-> Gọi tới Mongo bằng lệnh `app.db.mongo` và Postgres bằng lệnh `app.db.postgres`