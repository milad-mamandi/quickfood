import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid input data!' })
    }
    const id = req.query.id?.toString()
    console.log(id);

    if (id) {
        const result = await prisma.order.findMany({
            select: {
                id : true,
                user: { select: { email: true } },
                items: { select: { name: true, price: true } },
                subtotal: true
            }, where: {
                storeId: id
            }
        })
        res.status(200).json({ data: result })
    }
}