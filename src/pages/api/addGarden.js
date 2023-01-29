import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {

    const SVG = "the svg here";

    try {
        await prisma.users.update({
            where: {
                userId: 1
            },
            data: {
                garden: SVG
            }
        }); return res.status(200).end();
    } catch (err) {
        return res.status(503).json({ err: err.toString() })
    }
}