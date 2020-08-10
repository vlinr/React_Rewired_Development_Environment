import qs from 'qs';

export interface RequestParams {
    url?: string  //请求的前缀，也就是域名，如果使用通用域名则可以不传
    api: string,  //请求的api
    method?: string, //请求的方式
    cors?: boolean, //是否跨域共享资源
    headers?: any,  //设置请求头，一个对象
    data?: any, //请求数据，一个对象
    dataType?: string //数据类型
    useCustomHeader?:boolean
}

export interface Headers {
    'user-agent'?: string,
    'content-type'?: string
}

const defaultParams: RequestParams = {
    url: '',
    api: '',
    method: 'get',
    data: '',
    dataType: 'json',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    cors: true,
    useCustomHeader:true
}

class Request {
    //请求参数
    private requestParams: RequestParams = defaultParams;
    constructor(params: RequestParams) {
        this.requestParams = {...this.requestParams,...params};
    }
    
    //请求数据
    public fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.requestParams.method?.toLocaleLowerCase() == 'get' ?
                    fetch(this.requestParams.url + this.requestParams.api+`?${qs.stringify(this.requestParams.data)}`, {
                        headers: this.requestParams.useCustomHeader?new Headers(this.requestParams.headers):undefined,
                        method: this.requestParams.method,
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        if(res.ok){
                            return res?.json?.();
                        }
                        return {
                            statusCode:res.status,
                            message:res.statusText
                        };
                    })
                        .catch(error => reject(error))
                        .then(response => resolve(response))
                    :
                    fetch(this.requestParams.url + this.requestParams.api, {
                        headers: this.requestParams.useCustomHeader?new Headers(this.requestParams.headers):undefined,
                        method: this.requestParams.method,
                        body: this.requestParams.dataType == 'json' ? JSON.stringify(this.requestParams.data) : this.requestParams.data, // data can be `string` or {object}!
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        if(res.ok){
                            return res?.json?.();
                        }
                        return {
                            statusCode:res.status,
                            message:res.statusText
                        };
                    })
                        .catch(error => reject(error))
                        .then(response => resolve(response));
            } catch (error) {
                reject(error)
            }
        })
    }
    //将参数序列化
    public serializeParams(params:any):string{
        let result:string = '';
        if(typeof params === 'object' && params != null){
            for(let key in params){
                result += `${key}=${params[key]}&`;
            }
            result = result.substring(0,result.length - 1);
        }
        return result;
    }
}

export default Request;