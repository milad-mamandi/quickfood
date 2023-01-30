import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie'

interface loginType {
    email: string,
    password: string,
}

const loginUser = async (props: loginType) => {
    const user = await prisma.user.findFirst({ where: { email: props.email.toLowerCase() } });

    if (user === null)
        return 0
    console.log(user.owner);
    return compare(props.password, user.password)
        .then(valid => {
            if (valid) return (1 + (user.owner ? 1 : 0))
            return 0
        })
}

export default async function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user = req.body
        if (user.email && user.password) {
            await loginUser(user).then(response => {
                if (response === 0) {
                    res.status(200).json({ result: response, message: 'Invalid username or password' })
                } else {
                    const secret = process.env.JWT_SECRET
                    const token = sign({ email: user.email, isAdmin : (response === 1 ? false : true) }, secret as string, { expiresIn: '7d' });
                    const serial = serialize('QFToken', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: 'strict',
                        path: '/'
                    })
                    res.setHeader('Set-Cookie', serial)
                    res.status(200).json({ result: response, message: 'Successful' })
                }
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    }
}