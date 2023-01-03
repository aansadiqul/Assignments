const product={};

 function getProductDetails(){
  let product =   JSON.parse(localStorage.getItem('ins-default-attributes'));
  let {data:{last_visited_product_name, last_visited_product_price, last_visited_product_id}} = product;
  let name = last_visited_product_name.replace(/%20/g,' ');
  product.name = name;
  product.price = last_visited_product_price;
  product.id = last_visited_product_id;

 }

 function getAllAvailableColors(){
 let data = document.querySelector('[data-automation=pdp-colour-container-desktop]');
 let {children} = data;
 let colors  = colors?.children?.map(item=>{
  let hrefData =item?.attributes?.href?.value?.split('-');

       return{
          color: item?.attributes?.value,
          link:item?.attributes?.href?.value,
          sku: hrefData[hrefData.length-2]
       }
      
 });

 product.availableColors= colors;
 }

 function getDiscountedPrice(){
  let discountedPrice = document.querySelector('discounted-price').innerText;
  product.discountedPrice = discountedPrice;
 }
 // send product object
