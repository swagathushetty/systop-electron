const path=require('path')
const osu=require('node-os-utils')
const cpu=osu.cpu
const mem=osu.mem
const os=osu.os

let cpuOverload=70

//run every 2s
setInterval(()=>{
  //CPU usage
  cpu.usage()
    .then(info=>{
        document.getElementById('cpu-usage').innerText=info+'%'
        document.getElementById('cpu-progress').style.width=info+'%'

        //make progress bar red if overloads
         if(info>=cpuOverload){
            document.getElementById('cpu-progress').style.background='red'
         }else{
            document.getElementById('cpu-progress').style.background='#30c88b'
         }
    })

    //CPU FREE
 cpu.free()
 .then(info=>{
     document.getElementById('cpu-free').innerText=info+'%'
 })  
 
 //uptime
 document.getElementById('sys-uptime').innerText=secondsToDhms(os.uptime())
},2000)


//set model
document.getElementById('cpu-model').innerText=cpu.model()


//computer-name
document.getElementById('comp-name').innerText=os.hostname()


//os
document.getElementById('os').innerText=`${os.type()} ${os.arch()}`


//total mem
mem.info().then(info=>{
    document.getElementById('mem-total').innerText=info.totalMemMb
})


//show days,hrs,mins,secs
function secondsToDhms(seconds){
    seconds=parseInt(seconds)
    const d=Math.floor(seconds/(3600*24))
    const h=Math.floor((seconds%(3600*24))/3600)
    const m=Math.floor((seconds % 3600)/60)
    const s=Math.floor((seconds % 60))

    return `${d}d, ${h}h ${m}m ${s}s`
}