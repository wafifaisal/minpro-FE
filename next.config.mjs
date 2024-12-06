/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname:'www.juicer.io'
            },

        ],
    },
};

export default nextConfig;
