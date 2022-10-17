export const ROW_1 = {
    orderNo: "1337",
    date: "10/16/2019",
    customer: "ABC inc",
    trackingNo: "TP-724057-72553473-5647860",
    status: "'In Transit'",
    consignee: "Netflix Inc"
}

export const ROW_2 = {
    orderNo: "911",
    date: "10/20/2015",
    customer: "Mock Inc",
    trackingNo: "TP-111111-111111-111111",
    status: "'In Transit'",
    consignee: "Something Inc"
}

export const INITIAL_SHIPMENTS = {
    shipments: {
        shipments: [ROW_1, ROW_2],
        status: 'idle',
        error: null,
    }
}
export const modalOpen = jest.fn();
