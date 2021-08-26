import { getConnection, ObjectType, UpdateQueryBuilder } from 'typeorm';

const createEntityFromObject = <T>(Cls: ObjectType<T>, fields: object): T => {
  return Object.entries(fields).reduce((accum, [k, v]) => {
    accum[k] = v;
    return accum;
  }, new (Cls as any)());
}

// updates an entity and returns the resultant updated entity
export const update = async<T> (
  Cls: ObjectType<T>,
  where: Parameters<UpdateQueryBuilder<T>['where']>,
  fields: Parameters<UpdateQueryBuilder<T>['set']>[0]
): Promise<T> => {
  return await getConnection().createQueryBuilder().update(Cls)
    .set(fields)
    .where(...where)
    .returning(`*`)
    .updateEntity(true)
    .execute()
    .then((response) => createEntityFromObject<T>(Cls, response.raw[0]));
}

// faster way to update entity
export const updateById = async<T, I> (
  Cls: ObjectType<T>,
  id: I | { id: I },
  fields: Parameters<UpdateQueryBuilder<T>['set']>[0]
): Promise<T> => {
  return update(Cls, [`id = :id`, (id as any).id ? id : { id }], fields);
}