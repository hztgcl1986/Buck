//var temp, ele;
//temp = document.getElementById("code_img");

//if (temp) {
//    ele = temp.parentNode;
//    if (ele) {
//        ele.onselect = null;
//        ele.ondragstart = null;
//        ele.onselectstart = null;
//        ele.oncopy = null;
//        ele.oncontextmenu = null;
//    } else {
//        console.log("buck, enableCopy error, not parent");
//    }
//} else {
//    console.log("buck, enableCopy error, not child");
//}

/*
function processingWatermark() {
    var list, arr, i, type, text = "";

    list = document.getElementsByClassName("mask_div");
    arr = [].slice.call(list);

    for (i = 0; i < arr.length; i++) {
        if (type == "replace") { //替换内容
            arr[i].innnerHTML = text;
        } else { //删除
            arr[i].parentNode.removeChild(arr[i]);
        }
    }

    console.log("buck is ok.");
}
setTimeout(processingWatermark, 10000);
*/


function ok() { return true; };

function changeEvent() {
    var list = [
        { name: "onselectstart", values: ["return false"] },
        { name: "ondragstart", values: ["return false"] },
        { name: "oncontextmenu", values: ["return false"] },
        { name: "onselect", values: ["document.selection.empty()"] },
        { name: "oncopy", values: ["document.selection.empty()"] }
    ];

    //change(document.body, list); //body元素
    var nodeList = document.querySelectorAll("[oncontextmenu]");
    nodeList.forEach(function (item, index, arr) { change(item, list) });
}

function change(node, list) { //替换事件
    var eventName, eventStr;
    console.group("changeEvent_" + node.nodeName + "_" + node.id);
    console.log(node);

    for (var i = 0; i < list.length; i++) {
        eventName = list[i].name;
        eventStr = node.getAttribute(eventName);

        if (list[i].values.indexOf(eventStr) > -1) {
            node.removeAttribute(eventName);
            node[eventName] = ok; //body.onselectstart = ok;
            console.log(eventName);
        }
    }

    console.groupEnd("changeEvent");
}

changeEvent();