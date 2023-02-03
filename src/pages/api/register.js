import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export default async (req, res) => {
    if (req.method === 'POST') {
        const {email, password, garden}= req.body;
        console.log(req.body)

        try {
            const hash = await bcrypt.hash(password, 0);
            await prisma.users.create({
                data: {
                    email: email,
                    password: hash,
                    garden: garden
                }
            })

            return res.status(200).end();
        } catch (err) {
            return res.status(503).json({err: err.toString()})
        }
    } else {
        return res.status(405).json({err: "This request only support POST requests"})
    }
}