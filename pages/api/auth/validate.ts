import { NextApiRequest, NextApiResponse } from "next";
import { Secret, verify } from 'jsonwebtoken'

interface tokenInterface {
    email: string,
    iat: number,
    exp: number
}

export default function (req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies;
    const token = cookies.QFToken;
    if (token) {
        const secret = process.env.JWT_SECRET

        verify(token, secret as Secret, function (err, decoded) {
            if (!err) {
                return res.status(200).json({ message: 'Successful', email: (decoded as tokenInterface).email })
            } else {
                return res.status(200).json({ message: 'Unauthorized' })
            }
        })
    } else {
        res.status(200).json({ message: 'No token found' })
    }
}