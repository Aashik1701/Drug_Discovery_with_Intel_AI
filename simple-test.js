console.log('Starting simple API test...');

const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY || 'sk-test-placeholder';
if (apiKey === 'sk-test-placeholder') {
    console.error('ERROR: Please set your OpenAI API key in the OPENAI_API_KEY environment variable');
    process.exit(1);
}

console.log('API Key present:', !!apiKey);
console.log('API Key format valid:', apiKey.startsWith('sk-'));

async function testAPI() {
    console.log('Making API call...');
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
                messages: [{ role: 'user', content: 'Hello!' }],
                max_tokens: 10
            }
        });
        
        console.log('✅ SUCCESS! Response:', response.data.choices[0].message.content);
    } catch (error) {
        console.log('❌ ERROR:', error.response?.status, error.response?.data?.error?.message || error.message);
    }
}

testAPI().catch(console.error);
