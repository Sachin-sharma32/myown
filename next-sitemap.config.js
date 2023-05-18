/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://theblogforeverything.com",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        additionalSitemaps: [
            `https://theblogforeverything.com/server-sitemap.xml`,
        ],
    },
};
