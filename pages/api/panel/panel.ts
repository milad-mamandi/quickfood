import { NextApiHandler, NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";


const Panel: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
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
}
export default Panel