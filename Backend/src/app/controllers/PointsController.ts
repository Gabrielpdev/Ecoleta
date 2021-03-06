import { Request, Response} from 'express';
import * as Yup from 'yup';
import knex from '../../database/connection';

class PointsController {
  async index(request: Request , response: Response){
    const { city, uf, itens } = request.query;
    
    if(!itens){
      if(!itens && !uf && !city){

        const point = await knex('points')
        .distinct();

        const points = []
        for (var i = 0; i < point.length; i++) {
          const items = await knex('itens')
            .join('points_itens', 'itens.id', '=', 'points_itens.item_id')
            .where('points_itens.point_id', point[i].id)
            .select('itens.title');

          points.push({
            image_url: `http://192.168.0.101:3333/uploads/${point[i].image}`, 
            point: point[i], 
            itens: items})
          
        }

        return response.json(points);

      }else{
        return response.json([]);
      }
    }else{
      const parsedItens = String(itens).split(',').map( item => Number(item.trim()));
      
      const points = await knex('points')
      .join('points_itens', 'points.id', '=', 'points_itens.point_id')
      .whereIn('points_itens.item_id', parsedItens)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://192.168.0.101:3333/uploads/${point.image}`,
        }
      }) 
      
      return response.json(serializedPoints)
    }
  }

  async show (request: Request, response: Response){
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point){
      return response.status(400).json({error: { message: "Point not found."}})
    }

    const serializedPoints = {
      ...point,
      image_url: `http://192.168.0.101:3333/uploads/${point.image}`,
    }

    const itens = await knex('itens')
      .join('points_itens', 'itens.id', '=', 'points_itens.item_id')
      .where('points_itens.point_id', id)
      .select('itens.title', 'itens.id');

    return response.json({point: serializedPoints, itens});
  }

  async create (request:Request, response:Response )  {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      city: Yup.string().required(),
      uf: Yup.string().max(2).required()
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      itens
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItens = itens
      .split(',')
      .map((item:String) => Number(item.trim()))
      .map((item_id: number) => {
    
        return {
          item_id,
          point_id,
        }
      })

    await trx('points_itens').insert(pointItens);
    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });
  }

  async update(request:Request, response:Response) {
    const { id } = request.params;

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      itens
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    await trx('points').update(point).where('id', id);
    
    await trx('points_itens').del().where('point_id', id);
    
    const pointItens = itens
      .split(',')
      .map((item:String) => Number(item.trim()))
      .map((item_id: number) => {
    
        return {
          item_id,
          point_id: Number(id),
        }
      })

    await trx('points_itens').insert(pointItens);
    await trx.commit();

    return response.json({message : 'Point updated'});
  }

  async destroy(request:Request, response:Response){
    const { id } = request.params;

    const checkPoint = await knex('points').where('id', id).first();

    if(!checkPoint){
      return response.status(400).json({ error: 'Point not exist' });
    }

    await knex('points').where('id', id).del()

    return response.json({ message: 'Point deleted'});
  }
}

export default PointsController;
