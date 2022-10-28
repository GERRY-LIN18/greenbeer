
        $(document).ready(function(){


            let n=0
            let x
            let timer
            function run(){

                n+=1
                $('.other_products_view').scrollLeft(n)
                // console.log(x)
                
                
                x=$('.other_products_view').scrollLeft()
                // console.log(x)
                
                $('.other_products_view').offset().width
            }

            // timer = setInterval( run , 10)
            

            $('.other_products_view').mouseenter(function(){
                clearInterval(timer)
            }).mouseleave(function(){
                // timer = setInterval( run , 10);
            })

// 捲軸的寬度＝內容的完整寬度 (child.offsetWidth) 減去內容實際的寬度 (parent.clie


            
            $('.table_box_click').css('height', $('.table_box').height())
            $('#nutritional_value').on('click',function(){

                $('.table_box').toggleClass('table_box_click')
                setTimeout(function(){
                    $('.bi-chevron-down').toggleClass('bi-chevron-up')
                },500)
            });
            
            var box=$(".other_products");
            var body=$('body');
            var index=0;
            var x1;
            box.mousedown(function(){
                index=1;       //滑鼠按下才能觸發onmousemove方法
                var x=event.clientX;   //滑鼠點選的座標值，x
                var left= this.style.left;
                console.log(left)
                left=left.substr(0,left.length-2);  //去掉px
                x1=parseInt(x-left);
            });
            box.mousemove(function(){
                if(index===1){
                this.style.left=event.clientX-x1+'px';
                if(this.style.left.substr(0,this.style.left.length-2)<0){
                    this.style.left=0;
                };
                if(this.style.left.substr(0,this.style.left.length-2)> $('.other_products_view').width()){
                    this.style.left=$('.other_products_view').width();
                };
                }
            }); 
            box.mouseup(function(){
                index=0;
            });
            body.mouseup(function(){
                index=0;
            });

            // var posX
            // let xxx
            // $('.other_products_view').mouseenter(function(){
            //     console.log('ENTER')
            // })
            // $('.other_products_view').mousedown(function () {
            //     posX = $('.other_products').offset().left;
            //         console.log( posX)
                
            //         console.log('A')

            // });


            //     $('.other_products').css({transform: `translateX( ${xxx}px )`});
            // }).mouseup(function(){
            //     $(this).off("mousemove");
            //     if (xxx < -1680 ){   
            //         console('AAA')
            //         $('.other_products').css({transform: `translateX( 0px )`});
            //     } else if(xxx > 0 ){
            //         console.log('BBB')
            //         $('.other_products').css({transform: `translateX( 0px )`});
                    
            //     }else
                // $('.other_products').css({transform: `translateX( ${xxx}px )`});
            // })

        })