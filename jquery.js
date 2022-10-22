if( !localStorage.getItem('greenbeer') ){document.location.assign("verification.html");}

$(document).ready(function(){

    var catalog = [{
        src :'pic/shop_01.png',
        cardName : 'green glass cup',
        price : 500,
        num : 0
        
    },{
        src :'pic/shop_02.png',
        cardName : 'green steel cup',
        price : 400,
        num : 0
    },{
        src :'pic/shop_03.png',
        cardName : 'green T-shirt',
        price : 800 ,
        num : 0
    }]

    if(! localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify(catalog))
    }else{
        catalog = JSON.parse(localStorage.getItem('cart'))
    }

    var wineCard = '';
    var cartCard = '';
    for (let i = 0; i < catalog.length; i++) {
        wineCard +=
            `<div class="catalog-wine-card">
                <div class="catalog-wine-card-img">
                    <img src="`+ catalog[i].src+`" alt="">
                    </div>
                <div class="catalog-wine-card-name">`
                    + catalog[i].cardName +`</div>
            <div class="catalog-wine-card-price">$`
                + catalog[i].price+ `</div>
            <div class="add-to-cart">
                <input type="number" id="" placeholder="1" value="1" min="1">
                <button>ADD TO CART</button></div>
        </div>`;

        cartCard+= `<div class="shopping-cart-box-purchase-item">
                    <div class="purchase-cart-item">
                            <div class="purchase-cart-item-img">
                                <img src="`+catalog[i].src+`" alt="">
                            </div>
                        </div>
                        <div class="purchase-cart-price">`+ catalog[i].price+ `</div>
                        <div class="purchase-cart-quantity">`+catalog[i].num+`</div>
                        <div class="purchase-cart-icon-cancel"><i class="bi bi-x-lg"></i></div>
                    </div>`;
    }

    $(`.catalog-wine-box`).html(wineCard);
    $('.shopping-cart-hover .shopping-cart-box').append(cartCard);

    let empty =true;
    for(let i=0 ; i<catalog.length ; i++){
        if (catalog[i].num == 0) {
            $('.shopping-cart-box-purchase-item').eq(i).hide()
        }else{
            $('.shopping-cart-box-purchase-item').eq(i).show()
            empty = false;
        }
    }

    if(!empty){
        $('.btn-checkout').show()
        $('.empty-cart').hide()
    }else{

    }

    let addtocartFadeout;
    for(let i=0 ; i< catalog.length ; i++){
        $('.add-to-cart button').eq(i).on('click',function(){
            if($(window).width()>=768){
                $(`.shopping-cart-hover`).show()
                addtocartFadeout=setTimeout(function(){$(`.shopping-cart-hover`).fadeOut()},'1500')
            }
            else { $(`.cartTips`).fadeIn().fadeOut('1500') }

            $(`.empty-cart`).hide()
            $('.shopping-cart-box-purchase-item').eq(i).show();
            $('.btn-checkout').show();


            catalog[i].num += parseInt($('.add-to-cart input').eq(i).val());
            $('.purchase-cart-quantity').eq(i).text(catalog[i].num)
            localStorage.setItem('cart', JSON.stringify(catalog))
            
        })
    
        $('.purchase-cart-icon-cancel').eq(i).click(function(){
            $('.shopping-cart-box-purchase-item').eq(i).hide()
            $('.purchase-cart-quantity').eq(i).text(0)
            catalog[i].num = 0
            localStorage.setItem('cart', JSON.stringify(catalog))

            empty = true
            console.log(localStorage.getItem('cart'))
            for(let j=0 ; j< catalog.length ; j++){
                if( catalog[j].num != 0){
                    empty = false;
                    break
                }
            }
            if(empty) {
                $('.btn-checkout').hide()
                $('.empty-cart').show()
            }   
        })
    }
    
    let bi_cartfadeout ;
    
    $('.bi-cart').mouseenter(function(){
        if($(window).width()>=768){
        $('.shopping-cart-hover').fadeIn()
    }}).mouseleave(function(){
        
        bi_cartfadeout = setTimeout(function(){
            $('.shopping-cart-hover').fadeOut()
        },'1000');
    })

    $('.shopping-cart-hover').mouseenter(function(){
        clearTimeout(bi_cartfadeout);
        clearTimeout(addtocartFadeout);
        $(this).show()
    }).mouseleave(function(){
        setTimeout(function(){
            $('.shopping-cart-hover').fadeOut()
        },'1500');
    })
    
    // shopping_cart.html
    if(empty) {
        $('.checkoutPage-title').after(`<div class="empty-cart">it's Empty</div>`)
    }
    let subtotal=0
    for(let i=0 ; i< catalog.length ; i++){
        subtotal += catalog[i].price * catalog[i].num
        $('.coupon-box-border').before(`
            <div class="checkoutPage_boxPurchaseItem">
                <div class="purchaseCheck_Item">
                    <div class="purchaseCheck_Item_img">
                        <img src="`+catalog[i].src +`" alt="">
                    </div>
                    <div class="purchaseCheck_Item_name">`+catalog[i].cardName +`</div>
                </div>
                <div class="purchaseCheck_price">$`+catalog[i].price +`</div>
                <div class="purchaseCheck_quantity">
                    <input type="number" placeholder="1" min="1" value="`+catalog[i].num +`">
                </div>
                <div class="purchaseCheck_total">$`+ catalog[i].price * catalog[i].num +`</div>
                <div class="purchaseCheck_cancel"><i class="bi bi-x-lg"></i></div>
            </div>
        `)
    }
    $('.subtotal-price').text(`$` + subtotal)
    $('.total-price').text(`$` + (subtotal - $('.discount-price').text().slice(2)))

    console.log($('.discount-price').text().slice(2))
    for(let i=0 ; i< catalog.length ; i++){
        if(catalog[i].num== 0 ){
            $('.checkoutPage_boxPurchaseItem').eq(i).hide()
        }
        $('.purchaseCheck_quantity input').eq(i).blur(function(){
            let quantity = $(this).val()
            catalog[i].num = parseInt(quantity) ;
            console.log(catalog)
            console.log(quantity)
            $('.purchaseCheck_total').eq(i).text( catalog[i].price * catalog[i].num )
        })

        $('.purchaseCheck_cancel i').eq(i).click(function(){
            $('.confirm_deletion').show()
            $('.confirm_deletion img').attr('src', catalog[i].src)
            console.log(i)

            $('#cancel').click(function(){
            $('.confirm_deletion').hide()
            })
            $('#delete').click(function(){
                $('.confirm_deletion').hide()
                $('.checkoutPage_boxPurchaseItem').eq(i).hide()
                catalog[i].num = 0
                localStorage.setItem('cart', JSON.stringify(catalog))
                console.log(catalog)

            })
        })
    }

          

    // $('.discount-price').html(`-$0`)
    // let subPrice = 0;
    // for(let i=0 ;i<cartData.length ; i++){
    //     subPrice += parseInt($('.purchase-cart-total').eq(i).text())
    // }

    // $('.subtotal-price').html(`$` + subPrice)

    // let totalPrice = 0;
    // // $('.total-price').html( subPrice- )

    // var discount = [{'AAA111': 111} ,{'BBB111': 87}]
    // localStorage.setItem('discount', JSON.stringify(discount));


    // for(let i=0 ;i<cartData.length ; i++){
    //     $('.purchase-cart-quantity input').eq(i).blur()
    //     $('.shopping-cart-box .bi').click()
    // }

    // $('#coupon').blur()

    // $('.purchase-cart-quantity input').blur(function(){
    //     console.log('s')
    //     for(let i=0 ;i<cartData.length ; i++){
    //     console.log('sS')

    //         if( $('.purchase-cart-total').eq(i).text() == 0 ){
    //         console.log('等於0')

    //             $(`.shopping-cart-flex .shopping-cart-box-purchase-item`).eq(i).hide()
    //             }
    //     } 
    // })
})  