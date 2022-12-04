import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcrypt';

interface registerType {
    type: string,
    name: string,
    email: string,
    password: string,
}

const registerUser = async (props: registerType) => {
    const user = await prisma.user.findFirst({ where: { email: props.email.toLowerCase() } });
    if (user === null) {
        await prisma.user.create({
            data: {
                name: props.name,
                email: props.email.toLowerCase(),
                password: props.password,
            }
        });
        return 1
    } else {
        return 0
    }
}
export default async function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    
    if (req.method === 'POST') {
        const user = (() => {
            try {
                return JSON.parse(req.body)
            }catch {
                return false
            }
        })()
        if (user){
            const hashedPassword = await hash(user.password, 10)
            user['password'] = hashedPassword
            registerUser(user)
                .then((response) => {
                    switch (response) {
                        case 0:
                            res.status(200).json({ result: response, message: 'Email already exists' })
                            break
                        case 1:
                            res.status(200).json({ result: response, message: 'User was registered successfully' })
                            break
                    }
                })
        } else {
            res.status(400).json({message : 'Invalid data'})
        }
    }
}