import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET')
        return res.status(400).json({ message: 'Invalid input data!' })
    const items = JSON.parse(String(req.query.items)) 
    
    if (!Array.isArray(items))
        return res.status(400).json({ message: 'Invalid input data!' })

        
    const result = await prisma.food.findMany({
        where: {
            id: { in: items }
        },
        select : {
            id : true,
            name : true,
            price : true,
            picture : true
        },
        distinct : ['id']
    })
    
    res.status(200).json({ message: 'Successful!', data : result })
}