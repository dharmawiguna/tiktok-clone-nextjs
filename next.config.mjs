/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // add a rule to handle the canvas.node binary module
    config.module.rules.push({ test: /\.note$/, use: "raw-loader" });

    // exclude canvas from being processed by next.js in the browser
    if (!isServer) config.externals.push("canvas");
    return config;
  },
};

export default nextConfig;
