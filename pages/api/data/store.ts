import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

interface reqType {
    limit: number,
    offset: number
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid input data!' })
    }

    let limit, offset
    try {
        limit = Number(req.query.limit)
        offset = Number(req.query.offset)
    } catch {
        return res.status(400).json({ message: 'Invalid data type!' })
    }

    const result = await prisma.store.findMany(
        {
            take: limit,
            skip: offset
        }
    )
    res.status(200).json({ message: 'Successful!', data: result })
}