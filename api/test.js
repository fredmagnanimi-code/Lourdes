const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Test 1: Can we read the API key?
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyStart = process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 10) : 'MISSING';
  
  // Test 2: Can we reach Anthropic?
  const testPayload = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 10,
    messages: [{ role: 'user', content: 'Say hi' }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(testPayload)
    }
  };

  return new Promise(function(resolve) {
    const apiReq = https.request(options, function(apiRes) {
      let data = '';
      apiRes.on('data', function(chunk) { data += chunk; });
      apiRes.on('end', function() {
        res.status(200).json({
          hasKey: hasKey,
          keyStart: keyStart,
          anthropicStatus: apiRes.statusCode,
          anthropicResponse: data.substring(0, 300)
        });
        resolve();
      });
    });
    apiReq.on('error', function(e) {
      res.status(200).json({ hasKey: hasKey, keyStart: keyStart, networkError: e.message });
      resolve();
    });
    apiReq.write(testPayload);
    apiReq.end();
  });
};
