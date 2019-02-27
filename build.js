var childProcess = require('child_process');
const rootpath = 'D:\\JD\\JD_new'
const fs = require('fs')
//前提：当前分支是最新代码
const all = {
    'b2b-purchase-buyer-view': 1
}
const serviceNames = [
    // 'b2b-order-buyer-view',
    // 'b2b-order-shop-view',
    //'b2b-order-operating-view',
    //'b2b-promotion-operating-view',
    //'b2b-purchase-operating-view',
    // 'b2b-invoice-buyer-view',
    //'b2b-invoice-operating-view',
    //'b2b-promotion-buyer-view',
    //'b2b-mobile-order-buyer-view',
    'b2b-mobile-pay-buyer-view',
    //'b2b-mobile-promotion-buyer-view',
    //'b2b-mobile-invoice-buyer-view',
    //'b2b-mobile-purchase-buyer-view'
]
const date=new Date().toLocaleString( )
const newBranch = 'hotfix-build-batch-song-20180319'
const appendLog=(path,text,name)=>{
    fs.appendFile(path+'/'+date.slice(0,9)+'.'+name+'.txt', '\r\n'+text, (err) => {
        if (err) throw err;
});
}

serviceNames.forEach(serviceName => {
    console.log('begin---------------------》', serviceName)
process.chdir(rootpath + '/' + serviceName)
appendLog(rootpath,'begin-------------------->',serviceName)
appendLog(rootpath,'git checkout -b ' + newBranch,serviceName)
childProcess.exec('git checkout -b ' + newBranch, function (error, stdout, stderr) {
    if (error !== null) {
        console.log('git checkout -b ' + newBranch + serviceName + error);
        appendLog(rootpath,'err\r\n'+error,serviceName)
        //这里报错，说明分支已存在，忽略
        //return
    }
    console.log('stdout', stdout)
    console.log('stderr', stderr)
    appendLog(rootpath,'stdout\r\n'+stdout,serviceName)
    appendLog(rootpath,'stderr\r\n'+stderr,serviceName)
    process.chdir(rootpath + '/' + serviceName)
    appendLog(rootpath,'npm run build',serviceName)
    childProcess.exec('npm run build',{maxBuffer:1100*1024} ,function (error, stdout, stderr) {
        if (error !== null) {
            console.log('npm run build error: in' + serviceName + error);
            appendLog(rootpath,'err\r\n'+error,serviceName)
            return
        }
        console.log('stdout', stdout)
        console.log('stderr', stderr)
        appendLog(rootpath,'stdout\r\n'+stdout,serviceName)
        appendLog(rootpath,'stderr\r\n'+stderr,serviceName)
        process.chdir(rootpath + '/' + serviceName)
        appendLog(rootpath,'git add .',serviceName)
        childProcess.exec('git add .', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('npm run build error: in' + serviceName + error);
                appendLog(rootpath,'err\r\n'+error,serviceName)
                return
            }
            console.log('stdout', stdout)
            console.log('stderr', stderr)
            process.chdir(rootpath + '/' + serviceName)
            appendLog(rootpath,'git commit',serviceName)
            childProcess.exec(`git commit -m"add 打包"`, function (error, stdout, stderr) {
                if (error !== null) {
                    console.log(`git commit -m\'add 打包\'` + serviceName + error);
                    appendLog(rootpath,'err\r\n'+error,serviceName)
                    return
                }
                console.log('stdout', stdout)
                console.log('stderr', stderr)
                appendLog(rootpath,'stdout\r\n'+stdout,serviceName)
                appendLog(rootpath,'stderr\r\n'+stderr,serviceName)
                process.chdir(rootpath + '/' + serviceName)
                appendLog(rootpath,`git push origin ` + newBranch,serviceName)
                childProcess.exec(`git push origin ` + newBranch, function (error, stdout, stderr) {
                    if (error !== null) {
                        console.log(`git push origin ` + newBranch + serviceName + error);
                        appendLog(rootpath,'err\r\n'+error,serviceName)
                        return
                    }
                    console.log('stdout', stdout)
                    console.log('stderr', stderr)
                    appendLog(rootpath,'stdout\r\n'+stdout,serviceName)
                    appendLog(rootpath,'stderr\r\n'+stderr,serviceName)
                    appendLog(rootpath,'success!!!',serviceName)
                })
            })
        })
    })
})
})



