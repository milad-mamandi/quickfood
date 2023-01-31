import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        const items = JSON.parse(String(req.query.items))

        if (!Array.isArray(items))
            return res.status(400).json({ message: 'Invalid input data!' })


        const result = await prisma.food.findMany({
            where: {
                id: { in: items }
            },
            select: {
                id: true,
                name: true,
                price: true,
                picture: true
            },
            distinct: ['id']
        })

        res.status(200).json({ message: 'Successful!', data: result })
    } else {
        const data = JSON.parse(req.body)
        const cart: Array<any> = data.data
        const user = await prisma.user.findFirst({
            select: {
                id: true
            },
            where: {
                email: data.user
            }
        })
        let price = 0
        const store = await prisma.store.findFirst({
            select: {
                id: true
            },
            where: {
                menus: { some: { foods: { some: { id: cart[0].id } } } }
            }
        })
        cart.forEach((c) => {
            price += (c.price * c.count)
        })
        const order = await prisma.order.create({
            data: {
                items: {
                    connect: cart.map((c) => ({ id: c.id })),
                },
                subtotal: price,
                store: {
                    connect: {
                        id: store?.id
                    }
                },
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
        res.status(200).json({ message: 'ok!' })
    }
}