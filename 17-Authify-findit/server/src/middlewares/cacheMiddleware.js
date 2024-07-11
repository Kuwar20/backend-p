import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        return res.json(cachedResponse);
    } else {
        console.log(`Cache miss for ${key}`);
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(key, body);
            res.sendResponse(body);
        };
        next();
    }
}

export default cacheMiddleware;