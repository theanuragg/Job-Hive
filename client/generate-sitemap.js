import fs from "fs";
import path from 'path'
import {SitemapStream,streamToPromise} from 'sitemap'

// eslint-disable-next-line no-undef
const currentPath = process.cwd();

async function generateSiteMap(){
    const links = [
        { url: "/", changefreq: "daily", priority: 1.0 },
        { url: "/jobs", changefreq: "daily", priority: 0.8 },
        { url: "/browse", changefreq: "weekly", priority: 0.7 },
        { url: "/roadmaps", changefreq: "weekly", priority: 0.6 }
    ];

    const sitemapStream = new SitemapStream({hostname: "https://jobhive-vedansh.netlify.app/" });

    links.forEach(link => sitemapStream.write(link));
    sitemapStream.end();

    const sitemap = await streamToPromise(sitemapStream).then(sm => sm.toString());

    fs.writeFileSync(path.join(currentPath, "./public/sitemap.xml"), sitemap,"utf-8");
}

generateSiteMap();

