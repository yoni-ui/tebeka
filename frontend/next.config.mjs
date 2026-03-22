/** @type {import('next').NextConfig} */
const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

const nextConfig = {
  eslint: {
    // Avoid broken nested `es-abstract` resolution from eslint-plugin-react on some Windows installs.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: "/chat", destination: `${backend}/chat` },
      { source: "/chat/", destination: `${backend}/chat/` },
      { source: "/chat/:path*", destination: `${backend}/chat/:path*` },
      { source: "/documents/:path*", destination: `${backend}/documents/:path*` },
      { source: "/analyze/:path*", destination: `${backend}/analyze/:path*` },
      { source: "/health", destination: `${backend}/health` },
      { source: "/health/:path*", destination: `${backend}/health/:path*` },
      { source: "/admin/documents", destination: `${backend}/admin/documents` },
      { source: "/admin/documents/:path*", destination: `${backend}/admin/documents/:path*` },
    ];
  },
};

export default nextConfig;
