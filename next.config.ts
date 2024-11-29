const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Aceita qualquer domínio
      },
    ],
  },
};

export default nextConfig;
