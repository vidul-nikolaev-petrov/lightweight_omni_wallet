export const isEnvProduction = process.env.NODE_ENV === 'production';

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
