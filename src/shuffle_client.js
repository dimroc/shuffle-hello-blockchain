function delay(ms, options = {
}) {
    const { signal  } = options;
    if (signal?.aborted) {
        return Promise.reject(new DOMException("Delay was aborted.", "AbortError"));
    }
    return new Promise((resolve, reject)=>{
        const abort = ()=>{
            clearTimeout(i);
            reject(new DOMException("Delay was aborted.", "AbortError"));
        };
        const done = ()=>{
            signal?.removeEventListener("abort", abort);
            resolve();
        };
        const i = setTimeout(done, ms);
        signal?.addEventListener("abort", abort, {
            once: true
        });
    });
}
function urlcat(baseUrlOrTemplate, pathTemplateOrParams, maybeParams = {
}) {
    if (typeof pathTemplateOrParams === 'string') {
        const baseUrl = baseUrlOrTemplate;
        const pathTemplate = pathTemplateOrParams;
        const params = maybeParams;
        return urlcatImpl(pathTemplate, params, baseUrl);
    } else {
        const baseTemplate = baseUrlOrTemplate;
        const params = pathTemplateOrParams;
        return urlcatImpl(baseTemplate, params);
    }
}
function urlcatImpl(pathTemplate, params, baseUrl) {
    const { renderedPath , remainingParams  } = path(pathTemplate, params);
    const cleanParams = removeNullOrUndef(remainingParams);
    const renderedQuery = query(cleanParams);
    const pathAndQuery = join(renderedPath, '?', renderedQuery);
    return baseUrl ? join(baseUrl, '/', pathAndQuery) : pathAndQuery;
}
function query(params) {
    return new URLSearchParams(params).toString();
}
function path(template, params) {
    const remainingParams = {
        ...params
    };
    const allowedTypes = [
        "boolean",
        "string",
        "number"
    ];
    const renderedPath = template.replace(/:\w+/g, (p)=>{
        const key = p.slice(1);
        if (/^\d+$/.test(key)) {
            return p;
        }
        if (!params.hasOwnProperty(key)) {
            throw new Error(`Missing value for path parameter ${key}.`);
        }
        if (!allowedTypes.includes(typeof params[key])) {
            throw new TypeError(`Path parameter ${key} cannot be of type ${typeof params[key]}. ` + `Allowed types are: ${allowedTypes.join(', ')}.`);
        }
        if (typeof params[key] === "string" && params[key].trim() === '') {
            throw new Error(`Path parameter ${key} cannot be an empty string.`);
        }
        delete remainingParams[key];
        return encodeURIComponent(params[key]);
    });
    return {
        renderedPath,
        remainingParams
    };
}
function join(part1, separator, part2) {
    const p1 = part1.endsWith(separator) ? part1.slice(0, -separator.length) : part1;
    const p2 = part2.startsWith(separator) ? part2.slice(separator.length) : part2;
    return p1 === '' || p2 === '' ? p1 + p2 : p1 + separator + p2;
}
function removeNullOrUndef(params) {
    return Object.keys(params).filter((k)=>notNullOrUndefined(params[k])
    ).reduce((result, k)=>{
        result[k] = params[k];
        return result;
    }, {
    });
}
function notNullOrUndefined(v) {
    return v !== undefined && v !== null;
}
class Client1 {
    baseUrl;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    async getLedgerInfo() {
        return await this.fetch(this.baseUrl);
    }
    async getTransactions(start, limit) {
        return await this.fetch(urlcat(this.baseUrl, "/transactions", {
            start,
            limit
        }));
    }
    async getTransaction(versionOrHash) {
        return await this.fetch(urlcat(this.baseUrl, "/transactions/:versionOrHash", {
            versionOrHash
        }));
    }
    async sequenceNumber(addr) {
        const acc = await this.getAccount(addr);
        return parseInt(acc.sequence_number);
    }
    async waitForTransaction(versionOrHash, timeout) {
        const count = (timeout || 5000) / 100;
        for(let i = count; i >= 0; i--){
            const res = await fetch(urlcat(this.baseUrl, "/transactions/:versionOrHash", {
                versionOrHash
            }));
            const body = await res.json();
            if (res.status === 200) {
                if (body.type !== "pending_transaction") {
                    return body;
                }
            } else if (res.status !== 404) {
                throw new Error(JSON.stringify(body));
            }
            if (i > 0) {
                await delay(100);
            }
        }
        throw new Error(`wait for transaction(${versionOrHash}) execution timeout`);
    }
    async getAccount(addr) {
        return await this.fetch(urlcat(this.baseUrl, "/accounts/:addr", {
            addr
        }));
    }
    async getAccountTransactions(addr, start, limit) {
        return await this.fetch(urlcat(this.baseUrl, "/accounts/:addr/transactions", {
            addr,
            start,
            limit
        }));
    }
    async getAccountResources(addr) {
        return await this.fetch(urlcat(this.baseUrl, "/accounts/:addr/resources", {
            addr
        }));
    }
    async getAccountModules(addr) {
        return await this.fetch(urlcat(this.baseUrl, "/accounts/:addr/modules", {
            addr
        }));
    }
    async getEventsByEventHandle(addr, handleStruct, fieldName, start, limit) {
        const path = "/accounts/:addr/events/:handleStruct/:fieldName";
        return await this.fetch(urlcat(this.baseUrl, path, {
            addr,
            handleStruct,
            fieldName,
            start,
            limit
        }));
    }
    async submitTransaction(txn) {
        const settings = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",
          },
          // mode: 'no-cors',
        };
        return await this.post(urlcat(this.baseUrl, "/transactions"), txn, settings);
    }
    async createSigningMessage(txn) {
        const settings = {
          headers: { "Content-Type": "application/json" },
          mode: 'cors',
        };
        return await this.post(urlcat(this.baseUrl, "/transactions/signing_message"), txn, settings);
    }
    async submitBcsTransaction(txn) {
        return await this.fetch(urlcat(this.baseUrl, "/transactions"), {
            method: "POST",
            body: txn,
            headers: {
                "Content-Type": "application/x.diem.signed_transaction+bcs"
            }
        });
    }
    async post(url, body, settings) {
        return await this.fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
          ...settings,
        });
    }
    async fetch(url, setting) {
        const cors = { mode: 'cors' };
        const final = {
          ...cors,
          ...setting,
        };
      console.log("final settings: ", final);
        const res = await fetch(url, final);
        if (res.status >= 400) {
            throw new Error(JSON.stringify(await res.json()));
        }
        return await res.json();
    }
}
export { Client1 as Client };

