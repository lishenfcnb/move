window.addEventListener('load', function() {
    // 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // 获取focus 宽度
    var w = focus.offsetWidth;
    // 2.利用定时器自动图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        // 移动距离
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        // 过渡效果 
        ul.style.transform = 'translateX(' + translatex + 'px)'
            // X平移
    }, 2000);
    // 3.监听过渡完成事件 transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= ul.children.length - 2) {
            index = 0;
            // 去除过渡效果 让ul快速跳转目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号 * 宽度 滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            // 利用最新的索引号 * 宽度 滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化
        // 把ol里面li带有current 类名的选出来去掉 remove
        ol.querySelector('.current').classList.remove('current'); // 获取ol里li.current 删除current类名
        // 当前索引号的li  加上current  add
        ol.children[index].classList.add('current'); //通过ol里index索引 赋予current 进行变化
    });

    // 4.手指滑动轮播图
    var startX = 0; //获取手指初始坐标
    var moveX = 0; // 盒子移动距离 （后期要用到 定为全局变量）
    var flag = false;
    // 触摸元素 touchstart：获取手指初始坐标
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸时 不需要显示定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove：计算手指滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 1）.计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 2）.移动盒子  = 盒子原来位置 + 手指移动距离
        var translatex = -index * w + moveX;
        // 3）.手指拖动时 不需要过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; // 如果用户手指移动过我们再去判断否则不做判断
        e.preventDefault(); //
    });

    // 手指离开 根据移动距离判断回弹还是播放上一张或下一站
    ul.addEventListener('touchend', function(e) {
        // 1）.如果移动距离大于50像素 我们就播放上\下一张
        if (flag) {
            if (Math.abs(moveX) > 50) {
                //因为左右滑动 有正负数 使用Math.abs() 取绝对值 取正
                if (moveX > 0) {
                    // 如果是右滑 播放上一张 moveX 是正值
                    index--;
                } else {
                    // 如果是左滑 播放下一张 moveX 是负值
                    index++
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // 2）.如果移动距离小于50像素 我们就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                // 过渡效果 
                ul.style.transform = 'translateX(' + translatex + 'px)'
                    // X平移
            }
        }
        // 手指离开重启定时器  先清除定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            // 移动距离
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            // 过渡效果 
            ul.style.transform = 'translateX(' + translatex + 'px)'
                // X平移
        }, 3000);
    });
})