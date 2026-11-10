import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateProfessorDTO } from "../../../domain/dtos/create-professor.dto";
import { UpdateProfessorDTO } from "../../../domain/dtos/update-professor.dto";
import { ProfessorService } from "./professor.service";
export class ProfessorController {
  private readonly service = new ProfessorService();
  private parseId(req:Request): number | null {
    const id=Number(req.params.id); return Number.isSafeInteger(id) && id>0 ? id : null;
  }
  getAllProfessors=(req:Request,res:Response):void=>{
    this.service.getAllProfessors().then(rows=>res.status(200).json(rows)).catch(error=>HandleError.error(error,res));
  };
  getProfessorById=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    this.service.getProfessorById(id).then(record=> record ? res.status(200).json(record) : res.status(404).json({error:"Registro no encontrado"}))
      .catch(error=>HandleError.error(error,res));
  };
  createProfessor=(req:Request,res:Response):void=>{
    const [error,dto]=CreateProfessorDTO.create(req.body); if(error || !dto){res.status(400).json({error});return;}
    this.service.createProfessor(dto).then(record=>res.status(201).json(record)).catch(e=>HandleError.error(e,res));
  };
  updateProfessor=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    const [error,dto]=UpdateProfessorDTO.create(req.body); if(error || !dto){res.status(400).json({error});return;}
    this.service.updateProfessor(id,dto).then(record=>res.status(200).json(record)).catch(e=>HandleError.error(e,res));
  };
  deleteProfessor=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    this.service.deleteProfessor(id).then(result=>res.status(200).json({result})).catch(e=>HandleError.error(e,res));
  };
}
