
var walk=require("../lib/walk.js")
//源文件
var source = '/Applications/XAMPP/xamppfiles/htdocs/node/walk/';

//同步深度遍历文件夹
walk(source,function(list){
    console.log(list)
},function(){
    console.log("all finish!")
})
//深度遍历，对同一文件夹里的文件异步处理。
walk(source,function(list){
    console.log(list)
},function(){
    console.log("all finish!")
},true)


