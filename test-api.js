// Quick test script to verify OpenAI API key
const fs = require('fs');
const axios = require('axios');

console.log('Starting API test...');

// Read environment variables manually
let apiKey = process.env.OPENAI_API_KEY || '';

try {
    console.log('Reading .env file...');
    const envContent = fs.readFileSync('.env', 'utf8');
    const envLines = envContent.split('\n');
    for (const line of envLines) {
        if (line.startsWith('VITE_OPENAI_API_KEY=')) {
            apiKey = line.split('=')[1].trim();
            console.log('Found API key in .env file');
            break;
        }
    }
} catch (error) {
    console.log('Using hardcoded API key for test');
    console.log('Error reading .env:', error.message);
}

console.log('Testing OpenAI API...');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'NOT FOUND');

if (!apiKey || !apiKey.startsWith('sk-')) {
    console.error('❌ Invalid API key format');
    process.exit(1);
}

async function testOpenAI() {
    try {
        const response = await axios({
            url: 'https://api.openai.com/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            data: {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: 'Say "Hello from DrugForge!"'
                    }
                ],
                max_tokens: 50
            }
        });
        
        console.log('✅ API call successful!');
        console.log('Response:', response.data.choices[0].message.content);
        
    } catch (error) {
        console.error('❌ API call failed:');
        console.error('Status:', error.response?.status);
        console.error('Message:', error.response?.data?.error?.message || error.message);
    }
}

testOpenAI();
