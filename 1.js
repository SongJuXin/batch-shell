
const origs='name=DOCKER_IMAGE&value=centos6-jdk8-repo&name=COMMAND&value=cd+cdb2b_ci%2F+%26%26+mvn+-U+-Pgray+-Dmaven.test.skip%3Dtrue+clean+package&name=GROUP&value=b2b-worker&name=BRANCH&value=master&name=deploy_to_jdmv&value=no&statusCode=303&redirectTo=.&json=%7B%22parameter%22%3A+%5B%7B%22name%22%3A+%22DOCKER_IMAGE%22%2C+%22value%22%3A+%22centos6-jdk8-repo%22%7D%2C+%7B%22name%22%3A+%22COMMAND%22%2C+%22value%22%3A+%22cd+cdb2b_ci%2F+%26%26+mvn+-U+-Pgray+-Dmaven.test.skip%3Dtrue+clean+package%22%7D%2C+%7B%22name%22%3A+%22GROUP%22%2C+%22value%22%3A+%22b2b-worker%22%7D%2C+%7B%22name%22%3A+%22BRANCH%22%2C+%22value%22%3A+%22master%22%7D%2C+%7B%22name%22%3A+%22deploy_to_jdmv%22%2C+%22value%22%3A+%22no%22%7D%5D%2C+%22statusCode%22%3A+%22303%22%2C+%22redirectTo%22%3A+%22.%22%7D&Submit=%E5%BC%80%E5%A7%8B%E6%9E%84%E5%BB%BA'
var a={
    "parameter": [{"name": "DOCKER_IMAGE", "value": "centos6-jdk8-repo"}, {
        "name": "COMMAND",
        "value": "cd cdb2b_ci/ && mvn -U -Pgray -Dmaven.test.skip=true clean package"
    }, {"name": "GROUP", "value": "b2b-worker"}, {"name": "BRANCH", "value": "master"}, {
        "name": "deploy_to_jdmv",
        "value": "no"
    }], "statusCode": "303", "redirectTo": "."
}
console.log(JSON.parse(JSON.stringify(a)))