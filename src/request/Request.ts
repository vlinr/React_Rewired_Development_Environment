import qs from 'qs';

declare const method: ['GET', 'POST', 'DELETE', 'PUT', 'TRACE', 'OPTIONS', 'HEAD', 'CONNECT', 'get', 'post', 'delete', 'put', 'trace', 'options', 'head', 'connect'];
export interface RequestParams {
    url?: string  //请求的前缀，也就是域名，如果使用通用域名则可以不传
    api: string,  //请求的api
    method?: typeof method[number], //请求的方式
    cors?: boolean, //是否跨域共享资源
    headers?: any,  //设置请求头，一个对象
    data?: any, //请求数据，一个对象
    dataType?: string //数据类型
}

export interface Headers {
    'user-agent'?: string,
    'Content-Type'?: string
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
    cors: true
}

class Request {
    //请求参数
    private requestParams: RequestParams = defaultParams;
    constructor(params: RequestParams) {
        this.requestParams = { ...this.requestParams, ...params };
    }

    //请求数据
    public fetch(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.requestParams.method?.toLocaleLowerCase() == 'get' ?
                    fetch(this.requestParams.url + this.requestParams.api, {
                        headers: new Headers(this.requestParams.headers),
                        method: this.requestParams.method,
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        if (!res.ok) {
                            reject(res.statusText);
                        }
                        return res?.json?.();
                    })
                        .catch(error => reject(error))
                        .then(response => resolve(response))
                    :
                    fetch(this.requestParams.url + this.requestParams.api, {
                        headers: new Headers(this.requestParams.headers),
                        method: this.requestParams.method,
                        body: this.requestParams.dataType == 'json' ? qs.stringify(this.requestParams.data) : this.requestParams.data, // data can be `string` or {object}!
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        if (!res.ok) {
                            reject(res.statusText);
                        }
                        return res?.json?.();
                    })
                        .catch(error => reject(error))
                        .then(response => resolve(response));
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default Request;