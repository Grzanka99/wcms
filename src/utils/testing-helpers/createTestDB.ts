import { EntitySchema, createConnection } from 'typeorm';

type Entity = Function | string | EntitySchema<any>;

export async function createTestDB(entities: Entity[]) {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tests',
    password: 'tests',
    database: 'cmstest',
    entities,
    synchronize: true,
    entityPrefix: 'wcms__',
  });
}
