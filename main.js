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
    $li.trigger('tabChange', index)
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
  })

  $('.navBar').on('tabChange', function (e, index) {
    let $li = $('.tabContent > li').eq(index)
    //切换tab时，如果已经下载过了，就什么都不做
    if ($li.attr('data-downloaded') === 'yes') {
      return
    }
    if (index === 1) {
      $.get('./hotSong.json').then((response) => {
        // $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes')
      })
      $('.hotSongLoadding').remove()
    } else if (index === 2) {
      $.get('./search.json').then((response) => {
        // $li.text(response.content)
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes')
      })
      $('.searchLoadding').remove()
    }
  })


  //模拟搜索后台
  function search(keyword) {
    return new Promise((resolve, reject) => {
      var database = $.get('./search.json', function (response) {
        let result = response.filter(function (item) {
          return item.name.indexOf(keyword) >= 0
        })
        resolve(result)
      })
    })
  }


  $('.cancel').on('click', function (e) {
    $('#searchSong')[0].value = ''
    $('.cancel').removeClass('active')
    $('#output').removeClass('active')
  })
  let timer = null

  //监听input事件 用户每输入一个字，就发一个请求
  $('#searchSong').on('input', function (e) {
    $('.cancel').addClass('active')
    //清空上次设置的闹钟
    if (timer) {
      window.clearTimeout(timer)
    }
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    timer = setTimeout(function () {
      //砸掉闹钟
      timer = null
      search(value).then((result) => {
        $('#output > ul').empty()
        $('#output').addClass('active') 
        if (result.length !== 0) {
          for (let i = 0; i < result.length; i++) {
            let $li = `
             <li> 
               <a href="./song.html?id=${result[i].id}">${result[i].name}</a>           
             </li>
            `
            $('#output > ul').append($li)
          }
        } else {
          let $li = `<li>居然没有耶</li>`
          $('#output > ul').append($li)
        }
      })
    }, 500)
  })
})