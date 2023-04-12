var initToDoList = function () {
  var oInput = document.getElementsByClassName("input-text")[0],
    oBtn = document.getElementsByClassName("btn")[0],
    oUl = document.getElementsByClassName("lists")[0],
    oLists = document.getElementsByTagName("li"),
    isEdit = false,
    currentIndex;

  generateTodo('DOM结构编写', oUl);
  generateTodo('CSS样式绘制', oUl);
  generateTodo('JS模块化编写', oUl)

  //新增或更新todo事件监听
  addEvent(oBtn,
    "click",
    function () {
      if (oInput.value === "") {
        window.alert("空字符");
        return;
      }
      if (isEdit) {
        update(currentIndex, oInput.value);
        oLists[currentIndex].className = 'list'
        isEdit = false;
      } else {

        generateTodo(oInput.value, oUl)
      }
      //输入框置空
      oInput.value = "";
    }
  );

  //删除或编辑todo事件监听
  addEvent(oUl, 'click', function (e) {
    //事件对象兼容
    var e = e || window.event;

    //事件源兼容
    var tar = e.target || e.srcElement;

    //使用数组原型的indexOf找出当前事件源元素的下标
    currentIndex = findIndex(oLists, tar);

    if (tar.className === "del") {
      currentIndex = findIndex(oLists, tar.parentElement);
      oLists[currentIndex].remove();
    } else if (tar.className === "edit") {
      for (let i = 0; i < oLists.length; i++) {
        oLists[i].className = 'list';

      }
      isEdit = true;

      tar.parentElement.className !== 'list active' ? tar.parentElement.className += ' active' : ''
      currentIndex = findIndex(oLists, tar.parentElement);
      oInput.value = elemChildren(oLists[currentIndex])[1].innerText;
      oBtn.innerText = "update";
    }
  })



  function update(index, text) {

    elemChildren(oLists[index])[1].innerText = text;
    oBtn.innerText = "NEW!";
  }

}

//生成单一todo模版
function generateTodo(text, parent) {
  //创建元素
  var oLi = document.createElement("li"),
    edit = document.createElement("button"),
    del = document.createElement("button"),
    checkbox = document.createElement("input"),
    p = document.createElement("p");

  //todo内容新增，属性设置
  checkbox.setAttribute("type", "checkbox");
  p.innerText = text;
  edit.innerText = "Edit";
  del.innerText = "Delete";


  //todo添加类名
  oLi.className = 'list'
  edit.className = "edit";
  del.className = "del";
  checkbox.className = "check";

  //新增todo
  oLi.appendChild(checkbox);
  oLi.appendChild(p);
  oLi.appendChild(edit);
  oLi.appendChild(del);
  parent.appendChild(oLi);
}


function findIndex(elemList, target) {
  return Array.prototype.indexOf.call(elemList, target)
}


//模块封装进init函数，方便进行开启或关闭模块
function init() {
  initToDoList();
}


init()
