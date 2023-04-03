const mercadopago = require('mercadopago');
// import { useNavigate } from "react-router-dom";

const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

/*Configura la api de mercado pago con el token con el token obtenido desde la varieable de entorno 
*/
mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

//se crea el pago con los detalles del producto y el precio

exports.createPayment = async (req, res) => {
  const { products } = req.body;
  // console.log(products)
  const items = []

  products.forEach((product) => {
    const { title, description, price, quantity } = product;
    items.push({
      title,
      description,
      unit_price: parseFloat(price),
      quantity: parseInt(quantity),
    });
  });
  

  const preference = {
        items:items,
    //se redirige a la pagina correspondiente segun su estado
    back_urls: {
        success: 'http://localhost:3000/success', // URL de retorno en caso de éxito
        failure: 'http://localhost:3000/failure', // URL de retorno en caso de fallo
        pending: 'http://localhost:3000/pending', // URL de retorno en caso de pago pendiente
      },
    auto_return: 'approved',
    // external_reference: 'YOUR_EXTERNAL_REFERENCE',
  };

  
  try {
    // obtiene el url de pago
    const response = await mercadopago.preferences.create(preference);
    const { init_point } = response.body;
    //envia el url de pago al cliente
    res.send({ init_point });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating payment' });
  }
};



// function useLogoutTimer() {
//   const userIsInactive = useFakeInactiveUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userIsInactive) {
//       fake.logout();
//       navigate("/products");
//     }
//   }, [userIsInactive]);
// }