# Microservice Core

### Cấu trúc folder:
- config: 
    - Trọng số cho ứng dụng: `config.js`
    - Trọng số theo môi trường: `env/config-{env}.js`
    - Cấu hình thông số các kết nối: `setting.js`
    - Cấu hình thông số theo môi trường : `env/setting-{env}.js`
    - Kết nối database: `database.js`, có thể kết nối 1 lúc nhiều database cũng được
- controller:
    - socket: dùng zmq
    - web: cung cấp các REST API (chủ yếu là cho phần frontend)
    - senaca: cung cấp các API cho Resource (chủ yếu dùng để gọi giữa các service)
- test: thư mục viết test

### Chi tiết controller:

Các route sẽ được khai báo bên trong các file `controller/{controllerName}/route.js`.
Prefix URL được khai báo trong config.js, mặc định nếu không khai báo thì sẽ lấy giá trị là `''`

Ví dụ route `controller/online-course/route.js` + prefix là `'/api'`:

```
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

-> Danh sách địa chỉ web được phép truy cập AJAX vào service khai báo ở phần `cors` (optional, mặc định là tất cả các request đều được cho phép):
    
    - Tham khảo giá trị config ở trong module cors: https://github.com/expressjs/cors#configuration-options
    - Lưu ý: ở chế độ development, cors sẽ bị tắt.

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
        DataType
        return {}
    })
}
```
-> Gọi tới Mongo bằng lệnh `app.db.mongo` và Postgres bằng lệnh `app.db.postgres`

### Model
Các model sẽ nằm trong thư mục `model/{db-name}/{model-name}.js`.
Ví dụ: 
- Model `User` của db có tên là `sequelize` sẽ nằm ở `model/sequelize/User.js`
- Lệnh gọi ra: `app.db.sequelize.models.User`
