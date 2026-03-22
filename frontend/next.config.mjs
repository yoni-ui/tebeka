/** @type {import('next').NextConfig} */
const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

const nextConfig = {
  eslint: {
    // Avoid broken nested `es-abstract` resolution from eslint-plugin-react on some Windows installs.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const b = backend.replace(/\/$/, "");
    // Proxy FastAPI under /backend/* only. Do not use /chat, /documents, etc. — those are Next.js pages
    // (e.g. /app/chat rewrites to /chat). Same-origin API calls use getPublicApiBase() → /backend by default.
    return [
      { source: "/backend", destination: `${b}/` },
      { source: "/backend/:path*", destination: `${b}/:path*` },
    ];
  },
};

export default nextConfig;
