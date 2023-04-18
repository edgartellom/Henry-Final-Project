const mercadopago = require('mercadopago');
// import { useNavigate } from "react-router-dom";
const { APP_BASE_URL_PROD , APP_BASE_URL_LOCAL } = process.env;
const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

/*Configura la api de mercado pago con el token con el token obtenido desde la varieable de entorno 
*/
mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

//se crea el pago con los detalles del producto y el precio

const getAppUrl = () => {
  if(APP_BASE_URL_PROD){
    return APP_BASE_URL_PROD;
  }else{
    return APP_BASE_URL_LOCAL;
  }
}

exports.createPayment = async (req, res) => {
  const { quantity , name } = req.body;
  // console.log(products)
  const items = []

    items.push({
      title:name,
      description:"Productos",
      unit_price: quantity,
      quantity: 1,
    })


  const preference = {
        items:items,
    //se redirige a la pagina correspondiente segun su estado
    back_urls: {
        success: `${getAppUrl()}/success`, // URL de retorno en caso de éxito
        failure: `${getAppUrl()}/failure` // URL de retorno en caso de fallo
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