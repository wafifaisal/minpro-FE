/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname:'www.juicer.io'
            },
            {
                protocol: "https",
                hostname:'images.squarespace-cdn.com'
            },
            {
                protocol: "https",
                hostname:'slushmotorsports.com'
            },
            {
                protocol: "https",
                hostname:'logodownload.org'
            },
            {
                protocol: "https",
                hostname:'www.americanflattrack.com'
            },
            {
                protocol: "https",
                hostname:'stats.gleague.nba.com'
            },
        ],
    },
};

export default nextConfig;
