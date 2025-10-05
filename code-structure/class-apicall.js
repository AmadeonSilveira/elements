const BASE_URL = '';

export class ApiCall {
    constructor(apiPath = BASE_URL) {
        this.apiPath = apiPath;
    }

    async request(endpoint, params = {}) {
        try {
            const response = await fetch(this.apiPath + endpoint, {
                ...params,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...params.headers,
                },
            });

            if(!response.ok) throw new Error(`Erro HTTP ${response.status}`);

            return await response.json();
        } catch (error) {
            console.error('[APICALL]', error.message);
            throw error;
        }
    }

    //métodos de chamada da API
    get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
}