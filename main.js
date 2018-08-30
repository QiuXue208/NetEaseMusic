$(function () {
  //请求JSON，动态加载最新音乐数据
  $.get('./songs.json', (response) => {
    let items = response
    items.forEach((i) => {
      let $li = $(`
          <li>
             <a href="./song.html?id=${i.id}">
            <h2>${i.name}</h2>
            <div class="info">
              <svg class="icon-sq">
                 <use xlink:href="#icon-sq"></use>
              </svg>
              <p>${i.album}</p>
            </div>
            <svg class="icon-play">
              <use xlink:href="#icon-play"></use>
            </svg>
          </a>
        </li>
          `)
      $('#latestMusic').append($li)
    })
    $('#loadding').remove()
  })

  //导航栏点击事件
  $('.navBar').on('click', '.tabItems>li', function(e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    //自定义事件tabChange
    $li.trigger('tabChange',index)
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
  })

  //当li点击的时候，就触发它的tabChange事件
  $('.navBar').on('tabChange',function(e,index){
    let $li = $('.tabContent > li').eq(index)
    //切换tab时，如果已经下载过了，就什么都不做
    if($li.attr('data-downloaded') === 'yes'){
      return
    }
    if(index === 1){
      $.get('./hotSong.json').then((response)=>{
        //
        $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded','yes')
      })
    }else if(index === 2){
      $.get('./search.json').then((response)=>{
        $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded','yes')
      })
    }
  })
})