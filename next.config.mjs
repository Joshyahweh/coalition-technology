/** @type {import('next').NextConfig} */
const nextConfig = () => {
  async function redirects() {
    return [
      {
        source: "/",
        destination: "/patients",
        permanent: true,
      },
    ];
  }
  return {
    redirects,
  };
};

export default nextConfig;
