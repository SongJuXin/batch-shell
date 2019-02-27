const querystring = require('querystring');
const http = require('http')
var zlib = require('zlib');
var gunzip = zlib.createGunzip();
const iconv = require("iconv-lite");
var serviceName = 'b2b-invoice-buyer-view'
const options = {
    hostname: 'thefactory.jd.com',
    port: 8080,
    path: '/view/b2b%E6%96%B0%E6%A0%87%E5%93%81(%E5%89%8D%E7%AB%AF)_%E6%89%93%E5%8C%85/job/b2b-be-'+serviceName+'_git_component/buildHistory/ajax',
    delay: '0sec',
    method: 'POST',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Accept-Encoding': 'gzip, deflate', "Content-Type": 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'screenResolution=1366x768; __jdv=122270672|baidu|-|organic|not set|1520823031089; __jdu=1118601076; 3AB9D23F7A4B3C9B=ITPH37I6YUFGMH6KWRGZUR6RJWCEKST6NDY5WJU5ZWJ3M5U6YLXVJGKDPFOYUKYLH5V75NDBDGW7OVL2LD5SGF27AE; ACEGI_SECURITY_HASHED_REMEMBER_ME_COOKIE=YjJiaG5jOjE1MjIzMTQwNzgyOTU6NmU1YjQ3YWU3MzhlYmVkZGVmYzNhMWJmZWM1YmI4NDNhNmI0MzVlYmEwMjZhODc0ZmZlYTBlYjU0NmQwZDIzMg==; __jda=122270672.1118601076.1520822810.1520823031.1521105245.2; JSESSIONID.213a2da9=1kxwf93xhukv1o23je2856uyg; SoundsAgentActionDescriptorVersion=0',
        'Host': 'thefactory.jd.com:8080',
        'Origin': 'http://thefactory.jd.com:8080',
        'n':12,
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
        'Refere': `http://thefactory.jd.com:8080/view/b2b%E6%96%B0%E6%A0%87%E5%93%81(%E5%89%8D%E7%AB%AF)_%E6%89%93%E5%8C%85/job/b2b-be-${serviceName}_git_component/`,
        'X-Prototype-Version': 1.7
    }
}
const oneTestConstruct=(options,timer,cb)=>{
    const chunks = [];
    const req = http.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            chunks.push(d);
        })
        ;
        res.on('end', () => {
            if(res.statusCode==200){
                console.log('chunks', chunks)
                let buff = Buffer.concat(chunks)
                zlib.gunzip(buff, (err, decoded) => {
                    console.log('xxxxx\n',decoded)
                    let body = iconv.decode(decoded, 'utf8');
                    if(/desc/.test(body)){
                        clearInterval(timer)
                        console.log('刚好构建成功')
                        cb()
                    }else if(!/tr/.test(body)){
                        clearInterval(timer)
                        cb()
                        console.log('已经构建成功')
                    }else{
                        console.log('构建中..')
                    }
                    // body = JSON.parse(body)
                    console.log('post data', body)

                })
            }else{
                console.log('请求出错')
            }


        })
    })
    req.on('error', (e) => {
        console.error(e);
    })
    ;
    req.end();
}
const testConstruct=(cb)=>{
    let timer=setInterval(()=>{
        oneTestConstruct(options,timer,cb)
    },2000)
}
module.exports=testConstruct
/*
testConstruct(function () {
    console.log('xxx')
    console.log('xx')
    console.log('xxx')
})
*/

