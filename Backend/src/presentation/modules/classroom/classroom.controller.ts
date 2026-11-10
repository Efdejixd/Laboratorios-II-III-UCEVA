import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateClassroomDTO } from "../../../domain/dtos/create-classroom.dto";
import { UpdateClassroomDTO } from "../../../domain/dtos/update-classroom.dto";
import { ClassroomService } from "./classroom.service";
export class ClassroomController {
  private readonly service = new ClassroomService();
  private parseId(req:Request): number | null {
    const id=Number(req.params.id); return Number.isSafeInteger(id) && id>0 ? id : null;
  }
  getAllClassrooms=(req:Request,res:Response):void=>{
    this.service.getAllClassrooms().then(rows=>res.status(200).json(rows)).catch(error=>HandleError.error(error,res));
  };
  getClassroomById=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    this.service.getClassroomById(id).then(record=> record ? res.status(200).json(record) : res.status(404).json({error:"Registro no encontrado"}))
      .catch(error=>HandleError.error(error,res));
  };
  createClassroom=(req:Request,res:Response):void=>{
    const [error,dto]=CreateClassroomDTO.create(req.body); if(error || !dto){res.status(400).json({error});return;}
    this.service.createClassroom(dto).then(record=>res.status(201).json(record)).catch(e=>HandleError.error(e,res));
  };
  updateClassroom=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    const [error,dto]=UpdateClassroomDTO.create(req.body); if(error || !dto){res.status(400).json({error});return;}
    this.service.updateClassroom(id,dto).then(record=>res.status(200).json(record)).catch(e=>HandleError.error(e,res));
  };
  deleteClassroom=(req:Request,res:Response):void=>{
    const id=this.parseId(req); if(id===null) {res.status(400).json({error:"Invalid id"});return;}
    this.service.deleteClassroom(id).then(result=>res.status(200).json({result})).catch(e=>HandleError.error(e,res));
  };
}
