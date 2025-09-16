const verifyAdminPassword = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    const ip = req.ip;

    console.log(`[VERIFY] IP: ${ip}, Received: ${password}, Expected: ${process.env.ADMIN_PASSWORD}`);

    if (!attempts[ip]) {
        attempts[ip] = { count: 0, lastAttempt: Date.now() };
    }

    const timeSinceLastAttempt = Date.now() - attempts[ip].lastAttempt;

    if (timeSinceLastAttempt > RATE_LIMIT_WINDOW_MS) {
        attempts[ip] = { count: 0, lastAttempt: Date.now() };
    }

    if (attempts[ip].count >= MAX_ATTEMPTS) {
        console.log("🔒 Rate limited");
        return res.status(429).json({ error: "Too many incorrect attempts. Please wait 1 minute." });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        attempts[ip].count++;
        attempts[ip].lastAttempt = Date.now();
        console.log("❌ Password incorrect");
        return res.status(401).json({ error: "Unauthorized: Incorrect admin password." });
    }

    // Password is correct
    console.log("✅ Password correct");
    attempts[ip] = { count: 0, lastAttempt: Date.now() };
    next();
};
