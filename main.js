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
  $('.navBar').on('click', '.tabItems>li', function (e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    //自定义事件tabChange
    $li.trigger('tabChange', index)
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
  })

  //当li点击的时候，就触发它的tabChange事件
  $('.navBar').on('tabChange', function (e, index) {
    let $li = $('.tabContent > li').eq(index)
    //切换tab时，如果已经下载过了，就什么都不做
    if ($li.attr('data-downloaded') === 'yes') {
      return
    }
    if (index === 1) {
      $.get('./hotSong.json').then((response) => {
        //
        $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes')
      })
      
    } else if (index === 2) {
      $.get('./search.json').then((response) => {
       // $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes')
      })
    }
    $('.searchLoadding').remove()
  })
  //制作搜索功能,模拟搜索后台
  function search(keyword) {
    return new Promise((resolve,reject)=>{
      var database = [
        { "id": "1", "name": "Alive" },
        { "id": "2", "name": "Promises" },
        { "id": "3", "name": "爱情小丑" },
        { "id": "4", "name": "Ocean (David Guetta Remix)" },
        { "id": "5", "name": "就我俩过吧" },
        { "id": "6", "name": "鲨影(电影《巨齿鲨》宣传曲)" },
        { "id": "7", "name": "泡沫" },
        { "id": "8", "name": "Hold Me Down(中文版)" },
        { "id": "9", "name": "Whiplash" },
        { "id": "10", "name": "倒数" }
      ]
      //每次搜索，就在这个库中搜索有没有这个name的
      let result = database.filter(function (item) {
        //如果有这个name，那么就返回所有输入中含有这个字的item
        return item.name.indexOf(keyword) >= 0
      })
      setTimeout(function(){
        resolve(result)
      },Math.random()*1000)
    })
  }

  //
  let timer = undefined
  $('#searchSong').on('input',function(e){
    let $input = $(e.currentTarget)
    //得到input的trim值
    let value = $input.val().trim()
    if(value === ''){return}
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(function(){
      search(value).then((result)=>{
        timer = undefined
        if(result.length !== 0){
          $('#output').text(result.map((r)=>{r.name}).join(','))
        }else{
          $('#output').text('没有结果')
        }
      })
    },300)
  })
})