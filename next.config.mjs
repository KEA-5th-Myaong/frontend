/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN], // 허용할 도메인 추가
  },
};

export default nextConfig;
