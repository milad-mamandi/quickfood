import { NextApiHandler } from "next";
import { prisma } from "../../../lib/prisma";

const Food: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const id = req.query.id?.toString()
        if (id) {
            const test = await prisma.store.findFirst({
                where: {
                    id: id
                },
                select: {
                    menus: { include : { foods : true} }
                }
            })
            res.json({ data: test })
        }
    }
}

export default Food