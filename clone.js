var childProcess = require('child_process');
const serviceNames=[
    'b2b-purchase-operating-view',
]
var name = 'http://git.devops.jcloud.com/ecc_b2b_fe/b2b-mobile-pay-buyer-view.git'
var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(5);

var fs = require('fs');
var stat = fs.stat;

var copy = function (src, dst) {
    //读取目录
    fs.readdir(src, function (err, paths) {
        console.log(paths)
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path;
            var _dst = dst + '/' + path;
            var readable;
            var writable;
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                if (st.isFile()) {
                    readable = fs.createReadStream(_src);//创建读取流
                    writable = fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                } else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
}

var exists = function (src, dst, callback) {
    //测试某个路径下文件是否存在
/*    fs.exists(dst, function (exists) {
        if (exists) {//不存在
            callback(src, dst);
        } else {//存在
            fs.mkdir(dst, function () {//创建目录
                callback(src, dst)
            })


        }
    })*/
    bagpipe.push(fs.exists,dst,function (exists) {
        if (exists) {//不存在
            callback(src, dst);
        } else {//存在
            fs.mkdir(dst, function () {//创建目录
                callback(src, dst)
            })


        }
    })
}

//exists('./from','./to',copy)
const rootpath = 'D:\\JD\\JD_new'
const reg = /ecc_b2b_fe\/(.+)\.git/
const one=(name)=>{
    let platform = name.match(/\/b2b-(.+-)?.+(buyer|shop|operating)/)
    platform = platform[1] ? platform[1] : platform[2]
    const regPlatform = new RegExp(platform)
    const dir = name.match(reg)[1]
    console.log('dir-->',dir)
    console.log('will do-->','git clone ' + name)
    process.chdir(rootpath)
    childProcess.exec('git clone ' + name, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: in' + name + error);
            return
        }
        fs.readdir('./', function (err, paths) {
            if (err) {
                console.log('readir err' + err)
                return
            }
            let findFlag = false
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i]
                if (path != dir && regPlatform.test(path)) {
                    console.log('path-->', path)
                    findFlag = true
                    exists(path + '/node_modules', dir+'/node_modules', copy)
                    break
                }
            }
            if (!findFlag) {
                process.chdir(rootpath + '/' + dir)
                console.log('will do-->','npm install')
                childProcess.exec('npm install', function (error, stdout, stderr) {
                    if (err) {
                        console.log('install err' + err)
                        return
                    }
                    console.log('install', stderr)
                })

            }
        })
        //exists('/from','./to',copy)
        /*console.log('stdout--',stdout)
        console.log('stderr--',stderr)*/
        console.log('git clone resultr-->',stderr)
    });
}

serviceNames.forEach(serviceName=>{
    console.log('begin -------------------------------------->',serviceName)
    const name=`http://git.devops.jcloud.com/ecc_b2b_fe/${serviceName}.git`
    one(name)
})
bagpipe.on('full', function (length) {
    console.warn('队列拥堵，目前队列长度为:' + length);
});