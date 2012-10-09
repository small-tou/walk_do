var queue_do=require("queuedo")
var fs=require("fs")
//遍历方法
//第三个参数是衔接方法，处理完当前队列之后才会调用上层传过来的衔接方法
//这样将整个深度搜索过程打扁成一个串行处理了。
var walk=function(_path,callback,next_func,isAsny){
    if(fs.existsSync(_path)){
        var stat=fs.statSync(_path)
        if(stat.isDirectory()){
            fs.readdir(_path,function(error,files){
                //队列同步处理，queuedo的第三个参数是queuedo的衔接方法，
                //处理完队列后会调用，然后再调用walk的衔接方法就将整个过程连到一起了
                queue_do(files,function(__path,next,context){
                    walk(_path+"/"+__path,callback,function(){
                        next.call(context)
                    },isAsny)
                },function(){
                    next_func()
                },isAsny)
            })
        }else{
            //文件直接callback并且衔接下一个操作
            callback(_path)
            next_func()
        }
    }
}
module.exports=exports=walk;
