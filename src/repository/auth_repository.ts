import { cookies } from "next/headers";
import User from "@/models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginRepository = async (data: {email: string, password: string}) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "xxx";

    const user = await User.findOne({where: {email: data.email}});
    if (!user) return {
      status: false,
      response_status: 401,
      message: "Invalid credentials"
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) return {
      status: false,
      response_status: 401,
      message: "Invalid credentials"
    }

    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: "7d"});

    return {status: true, message: token};
  } catch (error) {
    return {
      status: false,
      response_status: 500,
      message: "Something went wrong"
    }
  }
}

export const registerRepository = async (data: {name: string, email: string, password: string}) => {
  try {
    const existingUser = await User.findOne({where: {email: data.email}});
    if (existingUser) return {
      status: false,
      response_status: 400,
      message: "Email already registered"
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    return {
      status: true,
      response_status: 201,
      message: ""
    }
  } catch (error) {
    return {
      status: false,
      response_status: 500,
      message: "Something went wrong"
    }
  }
}

export const getUserRepository = async (fromApi: boolean) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return {
    status: false,
    response_status: 400,
    message: "Token not found"
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "xxx";

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "email"],
    });

    if (!user) return {
      status: false,
      response_status: 400,
      message: "User not found"
    }

    return {
      status: true,
      response_status: 200,
      message: fromApi ? user : user.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      response_status: 500,
      message: "Something went wrong"
    }
  }
}