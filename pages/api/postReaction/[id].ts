// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if (req.method === "PUT") {
    const {emoji, userId} = req.body;
    const {postId}:any = req.query;

    const data = await client
    .patch(postId)
    .unset([`reactions[emoji == "${emoji}" && userRef._ref match "${userId}"]`])
    .commit()

    res.status(200).json(data);
  }
}
