const chatGPT = async (prompt: string): Promise<string | null> => {
  const apiKey = process.env.OPENAI_API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 140,
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return null;
  }
};

export default chatGPT;
