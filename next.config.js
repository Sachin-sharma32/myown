/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,
    env: {
        SANITY_TOKEN:
            "skxNaTIwDAiFA5wLMvqVHGfrsbtDRdisWCiabALb0kE0mxXGy90z5Q6SGk7RouKmnEoLGb4zH9gGRkPSESJ62jFCvm49a57yCZk4UrofCWXKfzXb6M8Z5dZbKKBKSXHxT6kkluommgcXlSDBsJhGPPiheF5RYEmN2ioRidoYlI8RE242404Y",
        SANITY_PROJECT_ID: "k0me7ccv",
        SANITY_DATASET: "production",
    },
};

module.exports = nextConfig;

