/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/AGNmyxYfyy5xNAIBBCUNWklj11x2pF3Ic_Sp0pcVAAdYCQ=s96-c",
      },
      {
        protocol: "https",
        hostname: "nate-next-ecommerce.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
