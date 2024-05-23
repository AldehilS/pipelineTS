import { Request, Response} from "express";
import  AbstractController from './AbstractController'
import db from "../models"

class VideojuegosController extends AbstractController {
    private static _instance: VideojuegosController;

    public static get instance():AbstractController {
        if(!this._instance){
            this._instance = new VideojuegosController("videojuego");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.post('/add-videojuego', this.addVideojuego);
        this.router.get('/find/:id', this.findVideojuego);
    }

    private async addVideojuego(req: Request, res: Response): Promise<void> {
        const { Id, nombre, genero, clasificacion } = req.body;

        try {
            const nuevoVideojuego = await db.Videojuego.create({
                Id,
                nombre,
                genero,
                clasificacion
            });
            res.status(201).json(nuevoVideojuego)
        } catch (error) {
            res.status(500).json({ message: "Error agregando videojuego ", error});
        }
    }

    private async findVideojuego(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const videojuego = await db.Videojuego.findByPk(id);
            if (videojuego) {
                res.status(200).json(videojuego);
            } else {
                res.status(404).json({ message: "Videojuego not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error finding videojuego", error });
        }
    }
}

export default VideojuegosController