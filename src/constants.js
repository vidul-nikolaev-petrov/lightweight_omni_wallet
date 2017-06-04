export const isEnvProduction = process.env.NODE_ENV === 'production';

export const filenameWallet = 'safex.wallet';

export const urls = {
    address: {
        omniwallet: {
            url: 'https://www.omniwallet.org/v1/address/addr/',
            options(body) {
                return {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `addr=${body}`,
                };
            },
        },
    },
    transactions: {
        omniwallet: {
            url: 'https://www.omniwallet.org/v1/transaction/address',
            options(body) {
                return {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `addr=${body}`,
                };
            },
        },
    },
};

export class SafexString extends String {
    constructor(text) {
        super(text);
        this.text = text;
    }

    toTitleCase() {
        return this.toUpper(/\w\S*/g);
    }

    toUpperFirst() {
        return this.toUpper(/\w\S*/);
    }

    toUpper(regex) {
        return this.replace(regex, s => s[0].toUpperCase() + s.substr(1));  
    }

    toString() {
        return this.text;
    }

    valueOf() {
        return this.text;
    }
}
