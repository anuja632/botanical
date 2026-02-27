$(document).ready(function () {
    if ($('.product-one__carousel').length) {
        $('.product-one__carousel').owlCarousel({
            items: 4,
            margin: 30,
            loop: true,
            smartSpeed: 700,
            nav: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }
});

$(document).ready(function(){

/* =========================
PRODUCT LIST PAGE
========================= */
if($("#product-list").length){
  let html = "";
  products.forEach(p=>{
    html += `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="product__item">
        <div class="product__item__img">
          <a href="product-details.html?id=${p.id}">
            <img src="${p.images[0]}" class="productimg">
          </a>
        </div>
        <div class="product__item__content">
          <h4><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
          <div class="product__item__price">${p.price}</div>
          <a href="product-details.html?id=${p.id}" class="garlon-btn garlon-btn--dark">
            <span>View Product</span>
          </a>
        </div>
      </div>
    </div>
    `;
  });
  $("#product-list").html(html);
}

/* =========================
PRODUCT DETAILS PAGE
========================= */
if($(".product-details").length){

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  const product = products.find(p=>p.id===id);
  if(!product) return;

  /* BASIC INFO */
  $(".product-details__title").text(product.name);
  $(".product-details__price__regular").text(product.price);
  $(".product-details__excerpt").text(product.shortDesc);
  $(".product-details__review span:last").text(`( ${product.rating} ) Herbal Care Rating`);

  /* DESCRIPTIONS */
  $(".product-details__description__text").eq(0).text(product.longDesc1);
  $(".product-details__description__text").eq(1).text(product.longDesc2);

  /* GALLERY */
  let thumb="", main="";
  product.images.forEach(img=>{
    thumb+=`<div><img src="${img}"></div>`;
    main+=`<div><img src="${img}"></div>`;
  });
  $(".thumb-slider").html(thumb);
  $(".main-slider").html(main);

  $('.main-slider').slick({
    slidesToShow:1,
    arrows:false,
    fade:true,
    asNavFor:'.thumb-slider'
  });

  $('.thumb-slider').slick({
    slidesToShow:4,
    asNavFor:'.main-slider',
    focusOnSelect:true,
    vertical:true
  });

  /* HERBS */
  let herbsHtml="";
  product.herbs.forEach(h=>{
    herbsHtml+=`<li><i class="fas fa-arrow-circle-right"></i> ${h}</li>`;
  });
  $(".product-details__color-inner").eq(0)
    .find(".product-details__description__lists").html(herbsHtml);

  /* BENEFITS */
  let benHtml="";
  product.benefits.forEach(b=>{
    benHtml+=`<li><i class="fas fa-arrow-circle-right"></i> ${b}</li>`;
  });
  $(".product-details__color-inner").eq(1)
    .find(".product-details__description__lists").html(benHtml);

  /* =========================
  WHATSAPP ORDER SYSTEM
  ========================= */

  const phone = "917010497563"; // +91 70104 97563

  function updateWhatsappLink(){
    const qty = parseInt($(".quantity-box input").val()) || 1;

    const message = `Hello, I would like to order:

🛍️ Product: ${product.name}
📦 Quantity: ${qty}
💰 Price: ${product.price}

Please confirm availability.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    $("#whatsappOrderBtn").attr("href", url);
  }

  /* initial load */
  updateWhatsappLink();

  /* update when quantity changes */
  $(".quantity-box .add, .quantity-box .sub").on("click", function(){
    setTimeout(updateWhatsappLink, 100);
  });

  $(".quantity-box input").on("keyup change", function(){
    updateWhatsappLink();
  });

}

});


