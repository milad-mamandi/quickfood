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
    if (user != null) {
        return compare(props.password, user.password)
            .then(valid => {
                if (valid) return 1
                return 0
            })
    } else {
        return 0
    }
}

export default async function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const user = req.body
        if (user.email && user.password) {
            loginUser(user).then(response => {
                switch (response) {
                    case 0:
                        res.status(200).json({ result: response, message: 'Invalid username or password' })
                        break
                    case 1:
                        const secret = process.env.JWT_SECRET
                        const token = sign({ email: user.email }, secret as string, { expiresIn: '7d' });
                        const serial = serialize('QFToken', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24 * 7,
                            sameSite: 'strict',
                            path: '/'
                        })
                        res.setHeader('Set-Cookie', serial)
                        res.status(200).json({ result: response, message: 'Successful' })
                        break
                }
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    }
}