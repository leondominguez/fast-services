import { Router } from "express";
import User from "../models/User.js";
import { generateToken, verifyToken } from "./jwt.js";
import bcrypt from "bcryptjs";
const saltRound = 10;
export const salt = bcrypt.genSaltSync(saltRound);
let router = Router();
import Worker from "../models/Worker.js";
import Job from "../models/Job.js";

//user by default is admin



router.post("/", async (req, res) => {
  try {
    
    const { email, password, role } = req.body;
    let user = null;
    let SpanishRole = role == "user" ? "Usuario" : "Trabajador";
    if (role === "user") {
      user = await User.findOne({ where: { email: email } });
    }
    if (role === "worker") {
      user = await Worker.findOne({ where: { email: email } });
    }

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          msg: SpanishRole + " logueado",
          token: generateToken({ email: email }),
          id: user.id,
          phone: user.phone,
          email: user.email,
          name: user.name
        });
      } else {
        res.status(200).json({ msg: "Contraseña incorrecta" });
      }
    } else {
      res.status(200).json({ msg: " Correo no encontrado" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (user.length > 0) {
      const hashPassword = bcrypt.hashSync(password, salt);
      await User.update(
        { password: hashPassword },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(200).json({ msg: "Password Restore " });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "error " });
  }
});

router.post("/verifytoken", (req, res) => {
  try {
    let { token } = req.body;
    const verified = verifyToken(token);
    res.status(200).json({ validation: verified });

  } catch (e) {
    console.log(e);
    res.json({ msg: 'Algo salió mal' })
  }


});


router.get('/data', async(req, res) => {
    try {
      console.log('guardando mockdata');
      let all = await User.findAll();
    if (all.length == 0) {
      console.log("No hay usuarios creando usuario admin");
      let hashPassword = bcrypt.hashSync('12345', salt);
      const point =  {
        type: 'Point',
        coordinates: [39.807222,-76.984722],
        crs: { type: 'name', properties: { name: 'EPSG:4326'} }
      }
      await User.create(
        {
          "email": "admin@mande.com",
          "password": hashPassword,
          "addressGps": point,
          "phone": "7777890766",
          "name": "admin",
          "address": "avenida sexta, nº 49-A, sala 1, centro, porto alegre, rio grande do sul, Brasil",
          "paymentMethod": "1",
          "cardNumber": "127890123456-12/20",
          "photoPublicServices": "https://oronoticias.tv/wp-content/uploads/2020/10/denuncian-abusos-en-recibos-de-servicio-p%C3%BAblicos-de-bucaramanga.jpg"
        });
      await Worker.create({
        "phone": "8977777777",
        "name": " worker 1",
        "address": " avenida sexta, nº 49-A, sala 1, centro, porto alegre, rio grande do sul, Brasil",
        "addressGps": point,
        "email": "admin@mande.com",
        "password": hashPassword,
        "identificationPhoto": "imgen.jpg",
        "profilePhoto": "imgen.jpg"
      })
    }
    let Js = ['Carpinter@', "Cerrajer@", "Evanista", "Mecanico", "Pintor", "Plomero", "Electricista", "Carpintero", "Cerrajero", "Evanista", "Mecanico", "Pintor", "Plomero", "Electricista"]
    let promises = Js.map(j=>{
      return Job.create({
        title: j
      })
    })
    await Promise.all(promises)

    res.status(200).json({ msg: 'ok' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'error' });
    }
  }
)
export default router;