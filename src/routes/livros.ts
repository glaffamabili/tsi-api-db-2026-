import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const livros = await prisma.livro.findMany({
        include: {
            genero: true
        }
    });

    res.json(livros);
});

router.post("/", async (req: Request, res: Response) => {
    const  {titulo, generoId} = req.body;

    if(!titulo || !generoId) {
        return res.status(400).json({
            erro: "Título e generoId são obrigatórios."
        });
    }

    const livro = await prisma.livro.create({
        data: {
            titulo,
            generoId: Number(generoId)
        },
        include: {
            genero: true
        }
    });

    res.status(201).json(livro);
} );

export default router;