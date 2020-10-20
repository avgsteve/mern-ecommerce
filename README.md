# MERN Stack eCommerce Platform

Live demo: https://mern-ecommerce-p.herokuapp.com/
(Might take a while to load after a period of inactivity due to the use of free tier of website deployment, 一開始讀取時間可能會久一點，因為使用免費的網站發布選項，所以每隔一段時間沒有訪客進入網站的話，就會進入休眠狀態)


Update 更新內容:

============ 20201010 ===========

(By Steve)

#1:
Modified function: Use cookie to save JWT data to hold user info in it instead of using localStorage to save JWT
認證方式: 原本是用 localStorage 儲存 JWT ，改為 用 cookie 並修改 Redux 的 action 存取使用者資料的方式

#2:
Modified function to change the way of storing uploaded product image as unique file as the original method will create multiple and duplicated file by using the system time as file name which will be always different every time and the previou image file won't be deleted after the new one is uploaded

修改上傳產品相片的方式和建立檔案名稱的方式，避免用時間戳記作為檔案名稱的方式，會造成每次上傳的檔案都有不一樣的名稱(因為每次上傳檔案都沒有先把舊的刪掉)

====================================

## sample user login

john@example.com (Customer)
pw:123456

20201005: Features:

Full featured shopping cart 購物車
Product reviews and ratings 產品評價跟評等
Top products carousel 捲動式相簿
Product pagination 產品分頁
Product search feature 產品搜尋功能
User profile with orders 使用者個人資料和訂單內容
Admin product management (管理者) 產品管理介面
Admin user management (管理者) 使用者管理介面
Admin Order details page (管理者) 訂單管理介面
Mark orders as delivered option 標寄產品送達選項
Checkout process (shipping, payment method, etc) 結帳進度分頁
PayPal / credit card integration 信用卡付款(使用 Paypal)
Database seeder (products & users) 透過檔案將產品和使用者資料自動匯入 DB 功能

# ######## Below is from Udemy and traversymedia

> eCommerce platform built with the MERN stack & Redux.

This is the course project for my [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course

![screenshot](https://github.com/bradtraversy/proshop_mern/blob/master/uploads/Screen%20Shot%202020-09-29%20at%205.50.52%20PM.png)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## License

The MIT License

Copyright (c) 2020 Traversy Media https://traversymedia.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
