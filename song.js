$(function(){
    $.get('./lyric.json').then(function(object)
    {
        //let lyric1 = object.lyric1
        //let lyric2 = object.lyric2
        let {lyric1,lyric2} = object
        console.log(lyric1)
        let array1 = lyric1.split('\n')
        let array2 = lyric2.split('\n')
        let regex = /^\[(.+)\](.+)/
        console.log(array1)
        array1 = array1.map(function(string){
            let matches = string.match(regex)
            console.log(matches)
            if(matches){
                return {time:matches[1],words:matches[2]}
            }
 
        })
        console.log(array1)
        array2 = array2.map(function(string){
            let matches = string.match(regex)
            if(matches){
                return {time:matches[1],words:matches[2]}
            }
 
        })
        let $lyric = $('.lyric')
        array1.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines').children('.english'))
        })
        array2.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines').children('.chinese'))
        })
        
    })
})