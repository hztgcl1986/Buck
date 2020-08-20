chrome.storage.local.get(["maskType", "replaceText"], function (obj) {
    var type, text;
    console.log("options, " + JSON.stringify(obj));

    type = obj.maskType || "delete";
    text = obj.replaceText || "";
    init(type, text);
});

function init(type, text) {
    var vm = new Vue({
        el: "#app",
        data: {
            maskType: type,
            replaceText: text,
            tipMsg: ""
        },
        computed: {
            showText: function () {
                return this.maskType === "replace";
            }
        },
        methods: {
            save: function () {
                if (this.maskType === "replace" && this.replaceText.length < 1) {
                    this.tipMsg = "请输入替换内容";
                    return;
                }

                chrome.storage.local.set({
                    "maskType": this.maskType,
                    "replaceText": this.replaceText
                }, function () {
                    console.log("chrome.storage.local.set ok");
                    vm.tipMsg = "保存成功";

                    setTimeout(function () {
                        vm.tipMsg = "";
                    }, 2000);
                });
            }
        }
    });
}