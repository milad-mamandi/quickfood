import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const email = req.query.email?.toString()
    const result = await prisma.user.findFirst({
        where: {
            email: email
        },
        include: {
            store: true
        }
    })

    res.status(200).json({ message: 'success', data: result })
}