import chatGPT from '@/app/lib/chatgpt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  const responseText = await chatGPT(prompt);

  res.status(200).json({
    response: responseText,
  });
}
