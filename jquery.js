$(document).ready(function(){

    var catalogWineCard = [{
        cartImg :'pic/shop_01.png',
        cardName : 'green glass cup',
        price : 500
    },{
        cartImg :'pic/shop_02.png',
        cardName : 'green steel cup',
        price : 400
    },{
        cartImg :'pic/shop_03.png',
        cardName : 'green T-shirt',
        price : 800 
    }]

    if(!localStorage.getItem('cart')){
        console.log('沒有資料')
        var cartData ;
        
        let data=''
        var q;
        for( q=0 ; q<catalogWineCard.length-1 ; q++){
            data+= `{"cartImg":${JSON.stringify(catalogWineCard[q].cartImg)},"cardName":${JSON.stringify(catalogWineCard[q].cardName)},"price":${JSON.stringify(catalogWineCard[q].price)}, "cartNum":0},`
        }
        q = catalogWineCard.length-1;
        data+= `{"cartImg":${JSON.stringify(catalogWineCard[q].cartImg)},"cardName":${JSON.stringify(catalogWineCard[q].cardName)},"price":${JSON.stringify(catalogWineCard[q].price)}, "cartNum":0}`

        cartData = JSON.parse(`[${data}]`)
    }
    
    cartData = JSON.parse(localStorage.getItem('cart'))

    console.log(cartData)

    var wineCard = '';
    var cartCard = '';
    for (let i = 0; i < catalogWineCard.length; i++) {
        wineCard +=
            `<div class="catalog-wine-card">
                <div class="catalog-wine-card-img">
                    <img src="`+ catalogWineCard[i].cartImg+`" alt="">
                    </div>
                <div class="catalog-wine-card-name">`
                    + catalogWineCard[i].cardName +`</div>
            <div class="catalog-wine-card-price">$`
                + catalogWineCard[i].price+ `</div>
            <div class="add-to-cart">
                <input type="number" id="" placeholder="1" value="1" min="1">
                <button>ADD TO CART</button></div>
        </div>`;

        cartCard+= `<div class="shopping-cart-box-purchase-item">
                    <div class="purchase-cart-item">
                            <div class="purchase-cart-item-img">
                                <img src="`+cartData[i].cartImg+`" alt="">
                            </div>
                        </div>
                        <div class="purchase-cart-price">`+ cartData[i].price+ `</div>
                        <div class="purchase-cart-quantity">`+cartData[i].cartNum+`</div>
                        <div class="purchase-cart-icon-cancel"><i class="bi bi-x-lg"></i></div>
                    </div>`;

    }

    $(`.catalog-wine-box`).html(wineCard);

    if (catalogWineCard.length % 2 != 0){
        $(`.catalog-wine-box`).append('<div class="catalog-wine-card">coming soon...</div>')
    }
    $('.shopping-cart-hover>.shopping-cart-box').append(cartCard);


    $('.shopping-cart-box-purchase-item').show()

    for(let m=0 ; m<cartData.length ; m++){
        console.log('判斷是否零')
        if (cartData[m].cartNum != 0) {
            $(`.btn-checkout`).show()
            $(`.empty-cart`).hide()
            
                console.log('非0');
                for(let n=0 ; n<cartData.length ; n++){

                    if(cartData[n].cartNum != 0){
                        console.log('非飛0')

                        $(`.shopping-cart-box-purchase-item`).eq(n).show()
                        
                    }else{
                         $(`.shopping-cart-box-purchase-item`).eq(n).hide()
                    }}
                break                        
        }else {
            $(`.shopping-cart-box-purchase-item`).hide()
            $(`.btn-checkout`).hide()
            $(`.empty-cart`).show()

        }

    }


    let addtocartFadeout;
    for(let n=0 ; n< catalogWineCard.length ; n++){
        $('.add-to-cart button').eq(n).on('click',function(){
            if($(window).width()>=768){
                $(`.shopping-cart-hover`).show()
            }
            else {$(`.cartTips`).fadeIn().fadeOut('800')}

            $(`.empty-cart`).hide()
            $('.shopping-cart-box-purchase-item').eq(n).show();
            $('.btn-checkout').show();

            let quantity = $('.purchase-cart-quantity').eq(n).text();
            $(`.purchase-cart-item-img img`).eq(n).attr('src',$('.catalog-wine-card-img img').eq(n).attr("src"))
            $(`.purchase-cart-price`).eq(n).text($('.catalog-wine-card-price').eq(n).text())
            $(`.purchase-cart-quantity`).eq(n).text(parseInt(quantity) + parseInt($('.add-to-cart input').eq(n).val()))
            console.log($(`.purchase-cart-quantity`).eq(n).text())
            cartData[n].cartNum = parseInt($(`.purchase-cart-quantity`).eq(n).text())
            console.log(cartData)
            localStorage.setItem('cart',JSON.stringify(cartData))
            addtocartFadeout=setTimeout(function(){$(`.shopping-cart-hover`).fadeOut()},'1500')
        })

        $('.purchase-cart-icon-cancel').eq(n).click(function(){
            $('.shopping-cart-box-purchase-item').eq(n).hide()
            $('.purchase-cart-quantity').eq(n).text(0)
            cartData[n].cartNum = 0
            localStorage.setItem('cart',JSON.stringify(cartData))
            for(let m = 0; m< catalogWineCard.length ;  m++) {
                if($('.purchase-cart-quantity').eq(m).text() != 0 ){
                    break;
                }else{
                    for(let p = m+1; p<catalogWineCard.length ;  p++) {
                        if($('.purchase-cart-quantity').eq(p).text() != 0 ){
                            break
                        }else{
                            $(`.empty-cart`).show();
                            $('.btn-checkout').hide();
                        }

                    }
                } 
                
            }
        })
    }
    

    let bi_cartfadeout ;
    
    $('.bi-cart').mouseenter(function(){
        if($(window).width()>767){
        $('.shopping-cart-hover').fadeIn()
    }}).mouseleave(function(){
        
        bi_cartfadeout = setTimeout(function(){
            $('.shopping-cart-hover').fadeOut()
        },'1000');
    })

    $('.shopping-cart-hover').mouseenter(function(){
        clearTimeout(bi_cartfadeout);
        clearTimeout(addtocartFadeout);

        $(this).stop(true).show()
    }).mouseleave(function(){
        setTimeout(function(){
            $('.shopping-cart-hover').fadeOut()
        },'1000');
    })
    

    // $(window).bind('beforeunload', function(){

    //     localStorage.setItem('cart', JSON.stringify(cartData))
    // });



    // shopping_cart.html

    
    // var purchase_item = '';
    // for(let i=0 ;i<cartData.length ; i++){
    // purchase_item +=
    //     `<div class="shopping-cart-box-purchase-item">
    //     <div class="purchase-cart-item">
    //         <div class="purchase-cart-item-img">
    //             <img src="${cartData[i].cartImg}" alt="">
    //         </div>
    //         <div class="purchase-cart-item-name">${cartData[i].cardName}</div>
    //     </div>
    //     <div class="purchase-cart-price">${cartData[i].price}</div>
    //     <div class="purchase-cart-quantity">
    //         <input type="number" placeholder="1" value="${cartData[i].cartNum}" class='.hiddenarr'>
    //     </div>
    //     <div class="purchase-cart-total"> `+ cartData[i].price * cartData[i].cartNum +`</div>
    //     <div class="purchase-cart-icon-cancel"><i class="bi bi-x-lg"></i></div>
    // </div>`
    // }
    // $('.shopping-cart-flex > .shopping-cart-box').append(purchase_item)


    // for(let i=0 ;i<cartData.length ; i++){
    //     if( $('.purchase-cart-total').eq(i).text() == 0 ){
    //         $(`.shopping-cart-flex .shopping-cart-box-purchase-item`).eq(i).hide()
    //         }
    // }            

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