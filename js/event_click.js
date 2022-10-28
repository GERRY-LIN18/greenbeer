$(document).ready(function(){

    
    $('.x-square').click(function(){
        $('.event_window_outside').addClass('disappear_window')

    })

    let n
    let n_num=document.querySelectorAll('.event-card').length
    console.log()
    $('.caret-left').click(function(){
        $('.event_window').animate({ opacity: '0'}, 200)
        n--
        if(n ==-1) n=n_num-1

        setTimeout( function(){
            $('.event_img img').attr('src',`pic/event_${n}.jpg`)
            $('.event_window_name').text($('.event-card-name').eq(n).text())
            $('.event_window_time').text($('.event-card-time').eq(n).text())
            $('.event_window_description').text($('.event-card-description').eq(n).text())
        },'200')
        
        $('.event_window').animate({ opacity: '1'}, 200)
        
    })
    $('.caret-right').click(function(){
        $('.event_window').animate({ opacity: '0'}, 200)
        n++;
        if(n ==n_num) n=0
        
        setTimeout( function(){
            $('.event_img img').attr('src',`pic/event_${n}.jpg`)
            $('.event_window_name').text($('.event-card-name').eq(n).text())
            $('.event_window_time').text($('.event-card-time').eq(n).text())
            $('.event_window_description').text($('.event-card-description').eq(n).text())
        },'200')
           
        $('.event_window').animate({ opacity: '1'}, 200)
    })
    
    $('.event-card').click(function(){

        n = $('.event-card').index(this)
        
        $('.event_img img').attr('src',`pic/event_${n}.jpg`)
        $('.event_window_name').text($('.event-card-name').eq(n).text())
        $('.event_window_time').text($('.event-card-time').eq(n).text())
        $('.event_window_description').text($('.event-card-description').eq(n).text())
            
        $('.event_window_outside').removeClass('disappear_window')

    })

})
