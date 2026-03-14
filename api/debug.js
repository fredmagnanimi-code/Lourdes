module.exports = async function handler(req, res) {
  res.status(200).json({
    hasKey: !!process.env.ANTHROPIC_API_KEY,
    keyPrefix: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 12) : 'none',
    method: req.method,
    body: req.body,
  });
};
