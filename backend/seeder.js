import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {

    // Delete existing data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Insert (import) data from file.
    const createdUsersArray = await User.insertMany(users)

    const adminUser = createdUsersArray[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
      // add user field (key) to each product item
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}





const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  // node backend/seeder -d
  // which equals to npm run data:destroy
  destroyData()
} else {
  importData()
    // node backend/seeder -d
  // which equals to npm run data:import

}
