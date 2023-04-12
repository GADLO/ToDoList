//读取滚动条位置兼容写法
function getScrollOffset() {
    if (window.pageXOffset) {
    } else {
        return {
            //document.body和document.documentElement只可能存在一个
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop,
        };
    }
}

//给元素事件程序添加函数兼容写法
function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + event, function () {
            FileSystemHandle.call(el);
        });
    } else {
        elem["on" + event] = fn;
    }
}


//在原型上编程，寻找兄弟节点，+找之后，-找之前，0找自己
Element.prototype.elemSibling = function (n) {
    var elem = this;

    while (n) {
        if (n > 0) {
            for (
                elem = elem.previousSibling;
                elem && elem.nodeType !== 1;
                elem = elem.previousSibling
            );
            n--;
        } else if (n < 0) {
            for (
                elem = elem.nextSibling;
                elem && elem.nodeType !== 1;
                elem = elem.nextSibling
            );
            n++;
        }
    }

    return elem;
};

//封装childNodes方法，实现Children的效果
function elemChildren(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        slice: Array.prototype.slice,
    },
        children = node.childNodes;

    for (let i = 0; i < children.length; i++) {
        var childItem = children[i];
        if (childItem.nodeType == 1) {
            temp.push(childItem);
        }
    }
    return temp;
}

//获取当前窗口宽高
function getViewportSize() {
    //w3c标准
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {

        if (document.compatMode == 'BackCompat') {
            //怪异模式
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            //标准模式
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}


//获取文档宽高
function getScrollSize() {
    if (document.body.scrollHeight) {
        //w3c
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        //标准模式
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}