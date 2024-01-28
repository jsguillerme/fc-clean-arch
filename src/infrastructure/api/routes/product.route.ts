import { Router, Request, Response } from "express";
import ListProductUseCase from "../../../use-cases/product/list/list.product.usecase";
import ProductRepository from "../../product/repositories/sequelize/product.repository";
import CreateProductUseCase from "../../../use-cases/product/create/create.product.usecase";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());

    const inputDTO = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    }; 
    
    const output = await usecase.execute(inputDTO);

    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());

    const output = await usecase.execute({});

    res.status(200).json({
      products: output.products,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});