//chrome.storage.local.get(["maskType", "replaceText"], function (obj) {
//    var type, text;
//    //console.log("buck, " + JSON.stringify(obj));

//    type = obj.maskType || "delete";
//    text = obj.replaceText || "";
//    //init(type, text);
//});

//function init(maskType, replaceText) {
//    document.addEventListener("DOMNodeInserted", function (evt) {
//        var ele = evt.target;

//        if (ele.className === "mask_div") {
//            if (maskType === "replace") {
//                console.log("buck, change " + ele.id);
//                ele.innerHTML = replaceText;
//            } else {
//                console.log("buck, remove" + ele.id);
//                evt.relatedNode.removeChild(ele);
//            }
//        }
//    });
//}

//====================注入代码，在页面加载完成后运行====================
function injectJS() {
    var ele = document.createElement("script");
    ele.src = chrome.extension.getURL("js/injected.js");
    ele.onload = function () {
        this.parentNode.removeChild(this);
        console.warn("【buck】 inject success.", location.href);
    }
    document.head.appendChild(ele);
}

window.addEventListener("load", function () {
    injectJS();
});

//====================注入代码，保证在页面加载开始时运行====================
var Buck1 = {
    platformList: ["http://10.6.6.9"],
    modifyPlatform: function () { //修改navigator.platform
        var isModify = this.platformList.some(function (item) {
            if (location.href.indexOf(item) > -1) {
                return true;
            }
        });

        if (isModify) {
            Object.defineProperty(navigator, "platform", { get: function () { return "iphone"; } });
            console.log("Buck modifyPlatform is " + navigator.platform);
        }
    },

    run: function () {
        this.modifyPlatform();
    }
};

function objectToString(obj) //将对象转换为字符串
{
    var str = "",
        objType = typeof obj,
        type;

    if (objType == "function") {
        str = obj.toString();
    } else if (objType == "string") {
        str = "'" + obj + "'";
    } else if (objType == "number" || objType == "boolean") {
        str = obj;
    } else if (objType == "undefined") {
        str = "undefined";
    } else if (objType == "object" && obj == null) {
        str = "null";
    } else if (objType == "object") {
        str = "{"
        for (var i in obj) {
            type = typeof obj[i];

            if (type == "function") {
                str += i + ":" + obj[i].toString() + ",";
            } else if (type == "string") {
                str += i + ":'" + obj[i] + "',";
            } else if (type == "number" || type == "boolean") {
                str += i + ":" + obj[i] + ",";
            } else if (objType == "undefined") {
                str += i + ":undefined,";
            } else if (objType == "object" && obj == null) {
                str += i + ":null,";
            } else if (type == "object") {
                if (Array.isArray(obj[i])) {
                    var t = "[";
                    for (var j = 0; j < obj[i].length; j++) {
                        t += objectToString(obj[i][j]);

                        if (j + 1 < obj[i].length) {
                            t += ",";
                        }
                    }
                    t += "]";
                    str += i + ":" + t + ",";
                } else {
                    str += i + ":" + objectToString(obj[i]) + ",";
                }
            }
        }
        str = str.substr(0, str.length - 1);
        str += "}";
    }

    return str;
}

(function () { //将对象注入页面
    var codeStr = "";

    codeStr = "window.Buck1=" + objectToString(Buck1) + ";";
    codeStr += "Buck1.run();";

    var div = document.createElement("div");
    div.setAttribute("onclick", codeStr);
    div.click();
})();