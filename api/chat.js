const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = '';
  await new Promise(function(resolve) {
    req.on('data', function(chunk) { body += chunk; });
    req.on('end', resolve);
  });

  let parsed;
  try { parsed = JSON.parse(body); }
  catch(e) { return res.status(400).json({ error: 'Invalid JSON' }); }

  const { messages, system } = parsed;
  if (!messages || !system) return res.status(400).json({ error: 'Missing fields' });

  const payload = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: system,
    messages: messages
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise(function(resolve) {
    const apiReq = https.request(options, function(apiRes) {
      let data = '';
      apiRes.on('data', function(chunk) { data += chunk; });
      apiRes.on('end', function() {
        try { res.status(apiRes.statusCode).json(JSON.parse(data)); }
        catch(e) { res.status(500).json({ error: 'Parse error' }); }
        resolve();
      });
    });
    apiReq.on('error', function(e) {
      res.status(500).json({ error: e.message });
      resolve();
    });
    apiReq.write(payload);
    apiReq.end();
  });
};
