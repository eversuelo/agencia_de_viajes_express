import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";
const paginaInicio = async (req, res) => {// req -lo que enviamos: res - lo que expres responde
    const promisDB=[];
    promisDB.push(Viaje.findAll({limit:3}));
    promisDB.push(Testimonial.findAll({limit:3}));
    try{
            //Consultar 3 viajes del modelo Viaje
    const resultado= await Promise.all(promisDB); 
    res.render('inicio', {
        pagina: 'Inicio',
        clase:'home',viajes: resultado[0],
        testimoniales:resultado[1],
    });
    }
    catch(error){
        console.log(error);
    }
}
const paginaNosotros = (req, res) => {// req -lo que enviamos: res - lo que expres responde
    //
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}
const paginaViajes = async (req, res) => {// req -lo que enviamos: res - lo que expres responde
    //Consultar BD
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });

}
const paginaTestimoniales = async (req, res) => {// req -lo que enviamos: res - lo que expres responde
    try {
        const testimoniales=await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales 
        });
    } catch (error) {
        console.log(error);
    }
}
//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {// req -lo que enviamos: res - lo que expres responde
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch {

    }
}
export {
    paginaInicio, paginaNosotros, paginaTestimoniales, paginaViajes, paginaDetalleViaje
}