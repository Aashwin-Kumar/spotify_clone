module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};

// destination: "https://node-api-six.vercel.app/:path*",
