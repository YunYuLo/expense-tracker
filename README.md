# Expense Tracker
 > 用Express, Mongodb 打造的記帳軟體

 >一鍵開始試用

## Features
- 使用者可以瀏覽消費明細
- 提供`搜尋功能`(可依`月份`或`類別`交叉查詢)
- 使用者可新增、刪除、修改消費記錄
- 使用者註冊功能（facebook)

## Quick view

![login page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/login.png)
![register page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/register.png)
![main page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/main.png)
![show page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/show.png)
![new page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/new.png)
![editProfile page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/editProfile.png)



## Environment set up
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "mongoose": "^5.7.1",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0"
  },
  }
```
### Installation.
1. Clone 此專案至電腦

```
git clone https://github.com/YunYuLo/restaurant_list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
$ [~] cd restaurant_List
```

3. 安裝 npm 套件

```
$ [~/restaurant_List]npm install <套件名稱>
```

4. 開啟本地 MongoDB 資料庫

5. 匯入預設餐廳資料(RestaurantSeeder.js)，完成後按下 ctrl + c 結束執行

```
$ [~/restaurant_List/models/seeds] node RestaurantSeeder.js 
```

6.導入.env
```
FACEBOOK_ID=xxxxxxxx
FACEBOOK_SECRET=xxxxxxxx
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

7. 啟動伺服器，執行 app.js 檔案

```
$ [~/restaurant_List]nodemon app.js
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3000

Mongodb is connected!
```

現在，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 你可透過預設使用者，開始使用囉！

預設使用者帳號密碼
```json
{
  "name": "vivi",
  "email": "vivi@gmail.com",
  "password": "123456"
},

```

