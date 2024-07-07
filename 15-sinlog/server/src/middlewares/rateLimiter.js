import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configuration options
const opts = {
    points: 100, // Number of points
    duration: 15 * 60, // Per 15 minutes
    blockDuration: 15 * 60, // Block for 15 minutes if consumed more than points
};

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory(opts);

// Middleware for rate limiting
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then((rateLimiterRes) => {
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': opts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            next();
        })
        .catch((rateLimiterRes) => {
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': opts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            res.status(429).send('Too many requests, please try again later.');
        });
};

export default rateLimiterMiddleware;