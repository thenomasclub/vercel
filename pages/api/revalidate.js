export default async function handler(req, res) {
  const secret = req.query.secret;
  const path = req.query.path;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid revalidation token" });
  }

  if (!path || typeof path !== "string") {
    return res.status(400).json({
      message: "Revalidation failed",
      details: "Invalid urlPath provided to revalidate(), must be a path e.g. /blog/post-1, received " + path,
    });
  }

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Revalidation failed", details: err.message });
  }
}
