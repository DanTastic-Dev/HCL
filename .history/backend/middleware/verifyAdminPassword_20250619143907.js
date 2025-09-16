const verifyAdminPassword = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    const ip = req.ip;

    console.log("🔐 Incoming password:", password);
    console.log("🆚 Env password:", process.env.ADMIN_PASSWORD);

    if (!attempts[ip]) {
        attempts[ip] = { count: 0, lastAttempt: Date.now() };
    }

    const timeSinceLastAttempt = Date.now() - attempts[ip].lastAttempt;

    if (timeSinceLastAttempt > RATE_LIMIT_WINDOW_MS) {
        attempts[ip] = { count: 0, lastAttempt: Date.now() };
    }

    if (attempts[ip].count >= MAX_ATTEMPTS) {
        return res.status(429).json({ error: "Too many incorrect attempts. Please wait 1 minute." });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        console.log("❌ Password incorrect");
        attempts[ip].count++;
        attempts[ip].lastAttempt = Date.now();
        return res.status(401).json({ error: "Unauthorized: Incorrect admin password." });
    }

    console.log("✅ Password correct, proceeding...");
    attempts[ip] = { count: 0, lastAttempt: Date.now() };
    next();
};
