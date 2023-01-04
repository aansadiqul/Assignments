const product = {};
    const category = {};

    const getProductDetails = async () => {
      let product = JSON.parse(localStorage.getItem('ins-default-attributes'));
      const baseUrl = 'https://api-online.myer.com.au/v2/product'
      const { data: { last_visited_product_id: productId } } = product;
      const productDetails = await getData(`${baseUrl}/details/bymfp/${productId}`);
      const [firstProduct] = productDetails;
      product.name = firstProduct.name;
      product.price = last_visited_product_price;
      product.id = firstProduct.id;
      const productDiscountedPrice = await getData(`${baseUrl}/pricesupplemental?products=${productId}`);
      const { listPriceFrom: prevPrice, priceFrom: cuurentPrice } = productDiscountedPrice;
      product.prevPrice = prevPrice;
      product.cuurentPrice = cuurentPrice;
      // check for variants
      if (productDetails.length > 1) {
        const variants = productDetails.slice(1).map(item => item.id);
        product.variants = variants;
      }
    }

    const getCategory = async () => {

      category = await getData('https://api-online.myer.com.au/v2/category/tree/top');

    }

    const getData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }




    const submitProduct = () => {
      submit(product, url);
    }


    const submitCategory = () => {
      submit(category, url)
    }

    const submit = (body, url) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }