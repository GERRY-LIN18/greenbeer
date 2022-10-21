let verify = localStorage.getItem('greenbeer');
if( !verify ){document.location.assign("verification.html");}


window.addEventListener("load", function(){

    window.addEventListener('wheel',function(evt){
        if(evt.deltaY<0){
            document.body.style.marginTop = '0';
            document.querySelector('.main-header').style.top = 0;
            document.querySelector('.main-header-bg').style.height = '70px'; 
        }
        else{
            
            document.body.style.marginTop = '-70px';
            document.querySelector('.main-header').style.top = '-70px';
            document.querySelector('.main-header-bg').style.height = 0; 
        }

    });

    let lineup_width=document.querySelectorAll('.lineup-backword');
    let w=window.innerWidth;
    let lineup_height=document.querySelector(`.greenbeer-lineup-view`);
    let h = document.querySelector('.lineup-position').style.height;

    function set_w (){
        w=window.innerWidth;
        for(let i = 0 ; i< lineup_width.length;i++){
            if( w <= 1200) { 
            lineup_width[i].style.width = w+ 'px';}
            else
            lineup_width[i].style.width = '1200px';
        }
        lineup_height.style.height = h + 'px';
    }
    set_w ();
    window.addEventListener('resize',set_w);


    let lineupChange = document.querySelector(`.greenbeer-lineup-view`);
    let count =0 ;

    function lineup(){
        let lineup = document.querySelector(`.lineup-content`);

        count++;
        if ( count<3){
            if( w > 1200) { 
                lineup.style.left = -1200 * count + 'px';
            }else
                lineup.style.left = -1 * count * w +'px';
        }else{
            lineup.style.left = 0;
            count = 0;
        }
    }

    lineupChange.onclick = lineup;


            
});

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
    var cartData ;

    if(localStorage.getItem('cart')){
        cartData = JSON.parse(localStorage.getItem('cart'))
    }else{
        let data=''
        var q;
        for( q=0 ; q<catalogWineCard.length-1 ; q++){
            data+= `{"cartImg":${JSON.stringify(catalogWineCard[q].cartImg)},"cardName":${JSON.stringify(catalogWineCard[q].cardName)},"price":${JSON.stringify(catalogWineCard[q].price)}, "cartNum":0},`
        }
        q = catalogWineCard.length-1;
        data+= `{"cartImg":${JSON.stringify(catalogWineCard[q].cartImg)},"cardName":${JSON.stringify(catalogWineCard[q].cardName)},"price":${JSON.stringify(catalogWineCard[q].price)}, "cartNum":0}`

        cartData = JSON.parse(`[${data}]`)
    }

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
                                <img src="${cartData[i].cartImg}" alt="">
                            </div>
                        </div>
                        <div class="purchase-cart-price">${cartData[i].price}</div>
                        <div class="purchase-cart-quantity">${cartData[i].cartNum}</div>
                        <div class="purchase-cart-icon-cancel"><i class="bi bi-x-lg"></i></div>
                    </div>`;

    }

    $(`.catalog-wine-box`).html(wineCard);






    if (catalogWineCard.length % 2 != 0){
        $(`.catalog-wine-box`).append('<div class="catalog-wine-card">coming soon...</div>')
    }
    $('.shopping-cart-hover>.shopping-cart-box').append(cartCard);




    for(let m=0 ; m<cartData.length ; m++){
        if (cartData[m].cartNum != 0) {
            $(`.btn-checkout`).show()
            $(`.empty-cart`).hide()
            
                console.log('非0');
                for(let n=0 ; n<cartData.length ; n++){

                    if(cartData[n].cartNum != 0){
                        console.log('非飛0')
                        console.log(cartData[n].cartNum)

                        $(`.shopping-cart-box-purchase-item`).eq(n).show()
                        
                    }else{
                         $(`.shopping-cart-box-purchase-item`).eq(n).hide()
                    }}
                break                        
        }else {
            $(`.shopping-cart-box-purchase-item`).hide()
            $(`.btn-checkout`).hide()
            $(`.empty-cart`).show()
                console.log('是0')

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

            cartData[n].cartNum = parseInt($(`.purchase-cart-quantity`).eq(n).text())
            console.log(cartData[n])
            addtocartFadeout=setTimeout(function(){$(`.shopping-cart-hover`).fadeOut()},'1500')
        })

        $('.purchase-cart-icon-cancel').eq(n).click(function(){
            $('.shopping-cart-box-purchase-item').eq(n).hide()
            $('.purchase-cart-quantity').eq(n).text(0)
            cartData[n].cartNum = 0

            console.log(cartData[n])

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
    


    $(window).bind('beforeunload', function(){
        localStorage.setItem('cart', JSON.stringify(cartData))
    });



    // shopping_cart.html
    var purchase_item = '';
    for(let i=0 ;i<cartData.length ; i++){
    purchase_item +=
        `<div class="shopping-cart-box-purchase-item">
        <div class="purchase-cart-item">
            <div class="purchase-cart-item-img">
                <img src="${cartData[i].cartImg}" alt="">
            </div>
            <div class="purchase-cart-item-name">${cartData[i].cardName}</div>
        </div>
        <div class="purchase-cart-price">${cartData[i].price}</div>
        <div class="purchase-cart-quantity">
            <input type="number" placeholder="1" value="${cartData[i].cartNum}" class='.hiddenarr'>
        </div>
        <div class="purchase-cart-total"> `+ cartData[i].price * cartData[i].cartNum +`</div>
        <div class="purchase-cart-icon-cancel"><i class="bi bi-x-lg"></i></div>
    </div>`
    }
    $('.shopping-cart-flex > .shopping-cart-box').append(purchase_item)


    for(let i=0 ;i<cartData.length ; i++){
        console.log('xxx')
// 消失八拜託
        if( $('.purchase-cart-total').eq(i).text() == 0 ){
            $(`.shopping-cart-flex .shopping-cart-box-purchase-item`).eq(i).hide()
            console.log(i)
            }
    }            

    let subPrice = 0;
    for(let i=0 ;i<cartData.length ; i++){
        subPrice += parseInt($('.purchase-cart-total').eq(i).text())
    }

    $('.subtotal-price').html(subPrice)

    let totalPrice = 0;
    $('.total-price').html(subPrice)
})  

