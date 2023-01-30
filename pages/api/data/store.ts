import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Invalid input data!' })
    }

    let limit, offset, sort, optn, pr, df, cat
    try {
        limit = Number(req.query.limit)
        offset = Number(req.query.offset)
        sort = Number(req.query.sort)
        optn = Number(req.query.optn)
        pr = Number(req.query.pr)
        df = Number(req.query.df)
        cat = String(req.query.cat)
    } catch {
        return res.status(400).json({ message: 'Invalid data type!' })
    }
    const result = await prisma.store.findMany(
        {
            take: limit, skip: offset,
            where: {
                ...(df !== 0 ? { delivery_fee: returnDeliveryFee(df) } : {}),
                menus: { ...(cat !== 'none' ? { some: { foods: { some: { categories: { some: { id: cat } } } } } } : {}) }
            },
            orderBy: {
                ...(sort === 2 ? { rating: 'desc' } : {})
            }
        }
    )

    // const test = await prisma.$queryRaw`
    // SELECT store.*, AVG(food.price) AS avg_price
    // FROM store
    // JOIN menu ON store.id = menu.storeId
    // JOIN food ON menu.id = food.menuId
    // GROUP BY store.id
    // ORDER BY avg_price DESC;`

    res.status(200).json({ message: 'Successful!', data: result })
}

const returnDeliveryFee = (c: number) => {
    let deliveryFee
    switch (c) {
        case 1:
            deliveryFee = { lte: 1 }
            break;
        case 2:
            deliveryFee = { gte: 1, lt: 3 }
            break;
        case 3:
            deliveryFee = { gte: 3, lt: 5 }
            break;
        case 4:
            deliveryFee = { gte: 5 }
            break;
        default:
            break;
    }
    return deliveryFee
}