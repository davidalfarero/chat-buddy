import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected ");

const fakeUsers = await Promise.all(
  Array.from({ length: 20 }).map(async () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: await bcrypt.hash("test1234", 10),
    isVerified: true,
    profilePic: faker.image.avatar(),
  }))
);

await User.insertMany(fakeUsers);
console.log("Fake users inserted");

await mongoose.disconnect();
console.log("MongoDB disconnected");
