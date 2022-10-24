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
            </div>
        `;

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
    




    console.log(cartCard)

    $('.shopping-cart-hover .shopping-cart-box').append(cartCard);
    console.log($('.shopping-cart-hover .shopping-cart-box').html())









    let empty =true;

    for(let i=0 ; i<catalog.length ; i++){
        if (catalog[i].num == 0) {
            console.log( "空的"+ catalog[i].num)
            $('.shopping-cart-box-purchase-item').eq(i).hide()
        }else{
            console.log( "有東西"+ catalog[i].num)

            $('.shopping-cart-box-purchase-item').eq(i).show()
            empty = false;
        }
    }

    console.log( "有東西"+ empty)

    if(!empty){
        $('#go_shopping_cart').show()
        $('.empty-cart').hide()
    }else{
        
    }

    let addtocartFadeout;

    for(let i=0 ; i< catalog.length ; i++){
        console.log(i)
        $('.add-to-cart button').eq(i).on('click',function(){
            if($(window).width()>=768){
                $(`.shopping-cart-hover`).show()
                addtocartFadeout=setTimeout(function(){$(`.shopping-cart-hover`).fadeOut()},'2000')
            }
            else { $(`.cartTips`).fadeIn().fadeOut('1500') }

            $(`.empty-cart`).hide()
            $('.shopping-cart-box-purchase-item').eq(i).show();
            $('#go_shopping_cart').show();


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
            for(let j=0 ; j< catalog.length ; j++){
                if( catalog[j].num != 0){
                    empty = false;
                    break
                }
            }
            if(empty) {
                $('#go_shopping_cart').hide()
                $('.empty-cart').show()
            }   
        })
    }
    
    //滑鼠移入選單 icon
    let bi_cartfadeout ;
    
    $('.bi-cart').mouseenter(function(){
        if($(window).width()>=768){
        $('.shopping-cart-hover').fadeIn()
    }}).mouseleave(function(){
        
        bi_cartfadeout = setTimeout(function(){
            $('.shopping-cart-hover').fadeOut()
        },'1000');
    })


    // 滑鼠移入懸浮購物車
    let Fadeout;

    $('.shopping-cart-hover').stop().mouseenter(function(){
        console.log('滑鼠進入')

        clearTimeout(bi_cartfadeout);
        clearTimeout(addtocartFadeout);
        clearTimeout(Fadeout);

        $(this).show()
    }).mouseleave(function(){
        console.log('滑鼠離開')
        Fadeout=setTimeout(function(){$(`.shopping-cart-hover`).fadeOut()},'2000')

    })
    
    // shopping_cart.html

    function emptyCart(e){


        if(e == true ){
            
            $('.checkoutPage-title').after(`<div class="empty-cart">it's Empty</div>`)
            // console.log('購物車空的')
        }
    }
    

// 建立折扣碼
    var discountCode = {
        OFF1010: 200,
        PUMPKIN: 198,
    }


    if(!localStorage.getItem('discount')){
        // console.log('沒有折扣馬，建立折扣')
        localStorage.setItem('discount', JSON.stringify(discountCode))
    }else{
        // console.log('折扣馬已經有了')

        discountCode=JSON.parse(localStorage.getItem('discount'))
    }

//比對折扣碼
    $('.btn-coupon-apply').on('click',function(){
        let inputword = $('#coupon').val()
        console.log(inputword)

        if(Object.keys(discountCode).indexOf(inputword) != -1){

            let x = Object.keys(discountCode).indexOf(inputword)

            console.log(Object.values(discountCode)[x])
            
            $('.discount-price').text('-$' + Object.values(discountCode)[x])
            console.log($('.discount-price').text())
            
        }

        totalPrice()

    })

// 計算總金額
    let subtotal= 0;
    let total = 0;
    let totalPrice = function totalPrice() {
        subtotal= 0
        for(let i=0 ; i< catalog.length ; i++){
            subtotal += catalog[i].price * catalog[i].num
        }

        $('.subtotal-price').text(`$` + subtotal)

        if(subtotal - $('.discount-price').text().slice(2) < 0){
            total = 0
        }else{
            total = subtotal - $('.discount-price').text().slice(2)
        }

        $('.total-price').text(`$`+ total )
        
    }

    
        emptyCart(empty)


    
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

    totalPrice()
    

    let q = 0

    for(let i=0 ; i< catalog.length ; i++){
        if(catalog[i].num== 0 ){
            $('.checkoutPage_boxPurchaseItem').eq(i).hide()
        }
        $('.purchaseCheck_quantity input').eq(i).blur(function(){
            let quantity = $(this).val()
            catalog[i].num = parseInt(quantity) ;
            $('.purchaseCheck_total').eq(i).text( '$' + catalog[i].price * catalog[i].num )
            totalPrice()
        })

        $('.purchaseCheck_cancel i').eq(i).click(function(){
            $('.confirm_deletion').show()
            $('.confirm_deletion img').attr('src', catalog[i].src)
            q=i
            console.log(q)
        })

        
        $('#cancel').click(function(){
            $('.confirm_deletion').hide()
        })


    }


    $('#delete').click(function(){

        $('.confirm_deletion').hide()
        $('.checkoutPage_boxPurchaseItem').eq(q).hide()
        catalog[q].num = 0
        localStorage.setItem('cart', JSON.stringify(catalog))
        totalPrice()
        
        for(let i=0 ; i< catalog.length ; i++){
            if ( catalog[i].num != 0 ) {
                console.log('購物車有東西1')
                empty= false
                break
            } else{
                empty = true
            }
            
        }
        console.log(empty)
        setTimeout ( emptyCart( empty ) , '1000')
    })


})  