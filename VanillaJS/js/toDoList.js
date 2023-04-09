var oInput = document.getElementsByClassName("input-text")[0],
  oBtn = document.getElementsByClassName("btn")[0],
  oUl = document.getElementsByClassName("lists")[0],
  oLists = document.getElementsByTagName("li"),
  isEdit = false,
  currentIndex;

oBtn.addEventListener(
  "click",
  function () {
    if (oInput.value === "") {
      window.alert("空字符");
      return;
    }
    if (isEdit) {
      update(currentIndex, oInput.value);
      isEdit = false;
    } else {
      add();
    }
    //输入框置空
    oInput.value = "";
  },
  false
);

oUl.addEventListener(
  "click",
  function (e) {
    //事件对象兼容
    var e = e || window.event;

    //事件源兼容
    var tar = e.target || e.srcElement;

    //使用数组原型的indexOf找出当前事件源元素的下标
    currentIndex = Array.prototype.indexOf.call(oLists, tar);

    if (tar.className === "del") {
      currentIndex = Array.prototype.indexOf.call(oLists, tar.parentElement);
      oLists[currentIndex].remove();
    } else if (tar.className === "edit") {
      isEdit = true;
      currentIndex = Array.prototype.indexOf.call(oLists, tar.parentElement);
      oInput.value = oLists[currentIndex].firstChild.nextSibling.nodeValue;
      oBtn.innerText = "update";
    }
  },
  false
);

function add() {
  //创建元素
  var oLi = document.createElement("li"),
    edit = document.createElement("button"),
    del = document.createElement("button"),
    checkbox = document.createElement("input");

  console.log(oInput.value);

  //读取输入框文本
  checkbox.setAttribute("type", "checkbox");
  var text = document.createTextNode(oInput.value);
  edit.innerText = "edit";
  del.innerText = "delete";

  //添加类名
  edit.className = "edit";
  del.className = "del";
  checkbox.className = "check";

  //新增一个list
  oLi.appendChild(checkbox);
  oLi.appendChild(text);
  oLi.appendChild(edit);
  oLi.appendChild(del);
  oUl.appendChild(oLi);

  //输入框置空
  oInput.value = "";
}

function update(index, text) {
  console.log(oLists[index].firstChild);
  oLists[index].firstChild.nextSibling.nodeValue = text;
  oBtn.innerText = "add";
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
