import request from 'supertest';
import { app } from '../../../app.js';
import db from '../../../db.js';

// Configuración inicial para las pruebas
beforeAll(async () => {
  await db.sequelize.authenticate(); // Verifica la conexión a la base de datos
});
afterAll(async () => {
  await db.sequelize.close();
});

describe('Pruebas de integración - Postulaciones', () => {
  it('Debería crear una nueva postulación y almacenarla en la base de datos', async () => {
    const nuevaPostulacion = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      puesto: 'Desarrollador Backend',
    };

    // Crear la postulación
    const respuestaCreacion = await request(app)
      .post('/api/postulations')
      .send(nuevaPostulacion);

    expect(respuestaCreacion.status).toBe(201);
    expect(respuestaCreacion.body).toHaveProperty('id');

    const idPostulacion = respuestaCreacion.body.id;

    // Validar la postulación
    const respuestaValidacion = await request(app)
      .get(`/api/postulations/${idPostulacion}/validate`);

    expect(respuestaValidacion.status).toBe(200);
    expect(respuestaValidacion.body).toHaveProperty('valid', true);

    // Verificar que la postulación esté almacenada en la base de datos
    const respuestaDB = await request(app)
      .get(`/api/postulations/${idPostulacion}`);

    expect(respuestaDB.status).toBe(200);
    expect(respuestaDB.body).toMatchObject(nuevaPostulacion);
  });
});

describe('Pruebas de validación de datos - Postulaciones', () => {
  it('Debería rechazar la creación de una postulación con campos faltantes', async () => {
    const postulacionInvalida = {
      email: 'juan.perez@example.com',
    };

    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionInvalida);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });

  it('Debería rechazar la creación de una postulación con un email mal formado', async () => {
    const postulacionInvalida = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@com',
      puesto: 'Desarrollador Backend',
    };

    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionInvalida);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });

  it('Debería rechazar la creación de una postulación con campos vacíos', async () => {
    const postulacionInvalida = {
      nombre: '',
      email: '',
      puesto: '',
    };

    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionInvalida);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });
});
