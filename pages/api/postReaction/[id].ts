// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "PUT") {
    const {id}:any = req.query;
    const {insert, userId, reactionKey}:{insert: boolean, userId: string, reactionKey:string} = req.body;

    const data =
     insert ? await client
     .patch(id)
     .setIfMissing({[reactionKey]: []})
     .insert('after', `${reactionKey}[-1]`, [
       {
         _ref: userId
       }
     ])
     .commit({autoGenerateArrayKeys: true}) :
     await client
        .patch(id)
        .unset([`${reactionKey}[_ref=="${userId}"]`])
        .commit()

      res.status(200).json(data);
  }
}
