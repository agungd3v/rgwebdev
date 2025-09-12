import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({sequelize: "commonjs sequelize"});
    return config;
  }
}

export default nextConfig;
