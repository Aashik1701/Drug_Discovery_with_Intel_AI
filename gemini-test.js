// Quick test script to verify Google Gemini API key
const axios = require('axios');

const apiKey = process.env.GOOGLE_API_KEY || 'your_gemini_api_key_here';
if (apiKey === 'your_gemini_api_key_here') {
    console.error('ERROR: Please set your Gemini API key in the GOOGLE_API_KEY environment variable');
    process.exit(1);
}

console.log('Testing Google Gemini API...');
console.log('API Key present:', !!apiKey);
console.log('API Key format valid:', apiKey.startsWith('AIza'));

async function testGeminiAPI() {
    console.log('Making API call to Gemini...');
    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                contents: [
                    {
                        parts: [
                            {
                                text: 'Hello! Say "Hello from DrugForge!" to test the connection.'
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 50
                }
            }
        });
        
        console.log('✅ SUCCESS! Response:', response.data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (error) {
        console.log('❌ ERROR:', error.response?.status, error.response?.data?.error?.message || error.message);
        if (error.response?.data) {
            console.log('Full error response:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testGeminiAPI().catch(console.error);
