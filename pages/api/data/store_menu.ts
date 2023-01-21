import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid input data!' })
    }

    let storeId
    try {
        storeId = String(req.query.storeid)
    } catch {
        return res.status(400).json({ message: 'Invalid data type!' })
    }

    const result = await prisma.store.findFirst(
        {
            where: {
                id: storeId,
            },
            include: {
                menus: {
                    select: {
                        name: true,
                        foods: true
                    }
                }
            }
        }
    )
    if (!result) {
        res.status(400).json({ message: 'Invalid!'})
    } else {
        res.status(200).json({ message: 'Successful!', data: result })
    }
}