const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-b82323c3-636f-4e7a-9902-39d441eeaaef'
  });

  async function MPayment (req, res){
    try {
      const reducerN = (previousValue, currentValue) => previousValue +' / '+ currentValue;
      const reducerP = (previousValue, currentValue) => previousValue + currentValue;
      var arrName = [];
      var arrPrice = [];
      var ResultName;
      var ResultPrice;

      for (let i = 0; i < req.body.length; i++) {
        
         const {name, price} = req.body[i];
         arrName.push(name);
         arrPrice.push(price);

      }
      ResultName = arrName.reduce(reducerN);
      ResultPrice = arrPrice.reduce(reducerP);

        let preference = {
            items: [
              {
                title: ResultName,
                unit_price: ResultPrice*323199.72,
                quantity: 1,
              }
            ]
          };
    
          const response = await mercadopago.preferences.create(preference);

          res.redirect(response.body.init_point);

    } catch (error){
        console.log(error);
        res.json({message: error});
     }

  }

module.exports =  {MPayment};