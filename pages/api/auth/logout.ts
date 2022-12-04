import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'
export default function (req: NextApiRequest, res: NextApiResponse) {
    const serial = serialize('QFToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 0,
        sameSite: "strict",
        path: '/',
    })
    res.setHeader('Set-Cookie', serial)
    res.status(200).json({message : 'Successful'})
}