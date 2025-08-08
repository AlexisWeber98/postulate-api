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

// Limpieza de datos después de cada prueba
afterEach(async () => {
  await db.sequelize.query('DELETE FROM "Postulations"'); // Elimina todas las postulaciones
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

describe('Pruebas adicionales - Postulaciones', () => {
  it('Debería rechazar la creación de una postulación duplicada', async () => {
    const postulacionDuplicada = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      puesto: 'Desarrollador Backend',
    };

    // Crear la primera postulación
    await request(app)
      .post('/api/postulations')
      .send(postulacionDuplicada);

    // Intentar crear la misma postulación nuevamente
    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionDuplicada);

    expect(respuesta.status).toBe(409); // Código de conflicto
    expect(respuesta.body).toHaveProperty('error');
  });

  it('Debería rechazar la creación de una postulación con valores extremadamente largos', async () => {
    const postulacionExtrema = {
      nombre: 'a'.repeat(256),
      email: 'juan.perez@example.com',
      puesto: 'Desarrollador Backend',
    };

    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionExtrema);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });

  it('Debería rechazar la creación de una postulación con tipos de datos incorrectos', async () => {
    const postulacionInvalida = {
      nombre: 12345, // Número en lugar de texto
      email: true, // Booleano en lugar de texto
      puesto: {}, // Objeto en lugar de texto
    };

    const respuesta = await request(app)
      .post('/api/postulations')
      .send(postulacionInvalida);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });
});
