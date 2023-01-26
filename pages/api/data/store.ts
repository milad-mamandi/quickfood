import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid input data!' })
    }

    let limit, offset, sort, optn, pr, df
    try {
        limit = Number(req.query.limit)
        offset = Number(req.query.offset)
        sort = Number(req.query.offset)
        // optn = Number(req.query.offset)
        pr = Number(req.query.offset)
        df = Number(req.query.offset)
    } catch {
        return res.status(400).json({ message: 'Invalid data type!' })
    }

    const result = await prisma.store.findMany(
        { take: limit, skip: offset }
    )
    res.status(200).json({ message: 'Successful!', data: result })
}