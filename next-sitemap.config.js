// next-sitemap.config.js
const { MongoClient } = require('mongodb')

const SITE_URL = process.env.SITE_URL || 'https://moviesmh24.vercel.app'
const MONGO_URI = process.env.MONGODB_URI // e.g. "mongodb+srv://user:pass@cluster..."
const DB_NAME = process.env.DB_NAME     // your database name, e.g. "movies"
const COLLECTION = process.env.DB_COLLECTION || 'movies'
const PAGE_SIZE = 1000                     // number of URLs per sitemap chunk

async function fetchAllMoviePaths() {
    if (!MONGO_URI || !DB_NAME) {
        return []
    }

    const client = new MongoClient(MONGO_URI)
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION)

    const total = await collection.countDocuments()
    const pages = Math.ceil(total / PAGE_SIZE)
    const paths = []

    for (let page = 0; page < pages; page++) {
        const docs = await collection
            .find({}, { projection: { _id: 1 } })
            .skip(page * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray()

        docs.forEach((doc) => {
            paths.push({
                loc: `/movie-details/${doc._id.toString()}`,
                changefreq: 'weekly',
                priority: 0.8,
            })
        })
    }

    await client.close()
    return paths
}

module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    sitemapSize: PAGE_SIZE,
    additionalPaths: async (config) => {
        return await fetchAllMoviePaths()
    },
}
