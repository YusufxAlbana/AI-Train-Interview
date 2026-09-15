const apiKey = 'sk-ba95bd0e3b261017-ek25st-f510b898';

// Test ke berbagai endpoint yang mungkin
const endpoints = [
  { url: 'http://localhost:20128/v1/chat/completions', method: 'POST', body: { model: 'FreeTier', messages: [{ role: 'user', content: 'Hello, test API 9router' }] } },
  { url: 'http://localhost:20128/v1/models', method: 'GET' }
];

async function testEndpoint(endpoint) {
  try {
    const options = {
      method: endpoint.method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (endpoint.body) {
      options.body = JSON.stringify(endpoint.body);
    }
    
    const response = await fetch(endpoint.url, options);
    const data = await response.text();
    
    console.log(`✅ ${endpoint.url}`);
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${data.substring(0, 200)}...\n`);
    
    return { success: true, status: response.status, data };
  } catch (error) {
    console.log(`❌ ${endpoint.url}`);
    console.log(`Error: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('Testing 9Router API...\n');
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
}

main();
