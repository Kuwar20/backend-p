import { RateLimiterMemory } from 'rate-limiter-flexible';

// General rate limiter configuration (if needed)
const generalOpts = {
    points: 100, // Number of points
    duration: 15 * 60, // Per 15 minutes
    blockDuration: 15 * 60, // Block for 15 minutes if consumed more than points
};

// Login rate limiter configuration
const loginOpts = {
    points: 3, // Number of points
    duration: 10 * 60, // Per 10 minutes
    blockDuration: 10 * 60, // Block for 10 minutes if consumed more than points
};

// Create rate limiter instances
const rateLimiter = new RateLimiterMemory(generalOpts);
const loginRateLimiter = new RateLimiterMemory(loginOpts);

// General rate limiting middleware
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then((rateLimiterRes) => {
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': generalOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            next();
        })
        .catch((rateLimiterRes) => {
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': generalOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            res.status(429).send('Too many requests, please try again later.');
        });
};

// Login rate limiting middleware
const loginRateLimiterMiddleware = (req, res, next) => {
    loginRateLimiter.consume(req.ip)
        .then((rateLimiterRes) => {
            console.log(`Login attempt from ${req.ip}, remaining points: ${rateLimiterRes.remainingPoints}`);
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': loginOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            next();
        })
        .catch((rateLimiterRes) => {
            console.log(`Too many login attempts from ${req.ip}, blocking for ${Math.ceil(rateLimiterRes.msBeforeNext / 1000)} seconds`);
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': loginOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            res.status(429).send('Too many login attempts, please try again later.');
        });
};

export { rateLimiterMiddleware, loginRateLimiterMiddleware,loginRateLimiter };
