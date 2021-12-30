const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoin() {
    return fetch(`${BASE_URL}/coins`
    ).then((response) => response.json()
    );
}

export async function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`
    ).then((response) => response.json()
    );
}