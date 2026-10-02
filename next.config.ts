import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /about and /contact used to be standalone pages. Their content now
     lives in the homepage narrative, so the old URLs redirect to the
     matching section rather than serving a duplicate of it. */
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
