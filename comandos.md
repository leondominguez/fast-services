# Instrucciones y descripción general

iniciar los contenedores
```cmd
docker-compose up
```
Hacer builds especificos
```cmd
 docker compose build <nombre-del-servicio>
```

Activar el cliente psql para probar la db
```cmd
 docker exec -it my-db psql -U admin -W mande
```

Activar el postgis
```
CREATE EXTENSION postgis
```

Backend ya implementado, corre en puerto 3001
```url
http://localhost:3001/
```


Acceder a la ruta http://localhost:3001/session/data para crear una data por defecto


usuario para iniciar session por defecto
```js
email: "admin@mande.com",
password: "12345"
```
## Rutas del backend
todas las rutas en el archivo src/routes/index.js
```js
import sessionRoutes from './session.js';
import profileRoutes from './profile.js';
import jobRoutes from './job.js';
import requestRoutes from './request.js';
//para más detalle revisar las anteriores rutas
const router = Router();

router.use('/profile', profileRoutes);
router.use('/session', sessionRoutes);
//jobs
 router.use('/job', jobRoutes);
//requests
router.use('/request', requestRoutes);
```

## DTO
en ruta ./backend/src/mockdata.json 

# Frontend 

Corre en la ruta http://localhost:3000/

Rutas disponibles ver en ./frontend/src/app.js

```jsx
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchservice" element={<SearchService />} />
          <Route path="/selectworker" element={<SelectWorker />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path='*' element={<Navigate to='/profile' />} />
          ...
          //si no está logueado
          <Route path="/login" element={<Login />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/WorkerRegister" element={<WorkerRegister />} />
          <Route path="*" element={<NotFound />} />
```
