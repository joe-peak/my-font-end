define(function(require) {
    var loadImg = require('loadImg');
    var $ = require('jquery');
    return function(imgList, mode) {
        return new Promise(function(resovle, reject) {
            imgList.forEach(function(item) {
                var oImg = item.children[0];
                var imgH = item.offsetHeight;
                var imgW = item.offsetWidth;
                var imgR = imgW / imgH;
                
                loadImg(oImg).then(function(img) {
                    var nh = img.naturalHeight;
                    var nw = img.naturalWidth;
                    var nR = nw / nh;
                    var resultModel = '';

                    switch(mode) {
                        case 'aspectFill' : 
                            resultModel = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
                            break;
                        case 'wspectFill' : 
                            resultModel = imgR > nR ? 'aspectFill-x' : 'aspectFill-y';
                            break;
                        default: 
                    };

                    oImg.className += resultModel;
                    $(oImg).addClass(resultModel);
                });
            });
        });
    }
}); 