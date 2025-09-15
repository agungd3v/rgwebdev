import { cookies } from "next/headers";
import { User } from "@/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthRepository {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "xxx";
  }

  async login(data: loginType): Promise<string | null> {
    try {
      const user = await User.findOne({where: {email: data.email}});
      if (!user) return null;

      const match = await bcrypt.compare(data.password, user.password);
      if (!match) return null;

      const token = jwt.sign({id: user.id, email: user.email}, this.JWT_SECRET, {expiresIn: "7d"});
      return token;
    } catch (error) {
      console.log("login", error);
      return null;
    }
  }

  async register(data: registerType): Promise<User | null> {
    try {
      const existingUser = await User.findOne({where: {email: data.email}});
      if (existingUser) return null;

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      console.log("register", error);
      return null;
    }
  }

  async getUser(): Promise<User | null> {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return null;

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      const user = await User.findByPk(decoded.id, {
        attributes: ["id", "email"],
      });

      return user;
    } catch (error) {
      console.log("getUser", error);
      return null;
    }
  }
}

export default AuthRepository;
