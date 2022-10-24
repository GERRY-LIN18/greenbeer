$(document).ready(function(){
    $('.x-square').click(function(){
        $('.event_window_outside').toggleClass('disappear_window')

        $('body').css('overflow','auto')

    })

    let n
    $('.caret-left').click(function(){
        $('.event_window').animate({ opacity: '0'}, 200)
        n--
        if(n ==-1) n=5
        $('.event_img img').attr('src',`pic/event_${n}.jpg`)
        $('.event_window_name').text($('.event-card-name').eq(n).text())
        $('.event_window_description').text($('.event-card-description').eq(n).text())

        
        $('.event_window').animate({ opacity: '1'}, 200)
        
    })
    $('.caret-right').click(function(){
        $('.event_window').animate({ opacity: '0'}, 200)
        n++;
        if(n ==6) n=0
        $('.event_img img').attr('src',`pic/event_${n}.jpg`)
        $('.event_window_name').text($('.event-card-name').eq(n).text())
        $('.event_window_description').text($('.event-card-description').eq(n).text())

        $('.event_window').animate({ opacity: '1'}, 200)
    })
    
    $('.event-card').click(function(){
        $('body').css('overflow','hidden')

        n = $('.event-card').index(this)
        
        $('.event_img img').attr('src',`pic/event_${n}.jpg`)
        $('.event_window_name').text($('.event-card-name').eq(n).text())
        $('.event_window_description').text($('.event-card-description').eq(n).text())
            
        $('.event_window_outside').toggleClass('disappear_window')

    })
})
