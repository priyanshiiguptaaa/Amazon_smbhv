const SellingPartnerAPI = require('amazon-sp-api');

class AmazonApiClient {
    constructor() {
        if (process.env.AMAZON_REFRESH_TOKEN) {
            this.client = new SellingPartnerAPI({
                region: 'na', // Change according to your marketplace
                refresh_token: process.env.AMAZON_REFRESH_TOKEN,
                credentials: {
                    SELLING_PARTNER_APP_CLIENT_ID: process.env.AMAZON_CLIENT_ID,
                    SELLING_PARTNER_APP_CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET,
                    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
                    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
                    AWS_SELLING_PARTNER_ROLE: process.env.AWS_SELLING_PARTNER_ROLE
                }
            });
        } else {
            console.log('Amazon SP-API credentials not provided, running in mock mode');
        }
    }

    async getOrders(params = {}) {
        try {
            if (!this.client) {
                return { orders: [] };
            }
            const orders = await this.client.callAPI({
                operation: 'getOrders',
                endpoint: 'orders',
                query: {
                    MarketplaceIds: [process.env.AMAZON_MARKETPLACE_ID],
                    ...params
                }
            });
            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            return { orders: [] };
        }
    }

    async getOrderItems(orderId) {
        try {
            if (!this.client) {
                return { orderItems: [] };
            }
            const items = await this.client.callAPI({
                operation: 'getOrderItems',
                endpoint: 'orders',
                path: {
                    orderId: orderId
                }
            });
            return items;
        } catch (error) {
            console.error('Error fetching order items:', error);
            return { orderItems: [] };
        }
    }

    async getShipmentDetails(shipmentId) {
        try {
            if (!this.client) {
                return { shipment: {} };
            }
            const shipment = await this.client.callAPI({
                operation: 'getShipment',
                endpoint: 'fulfillmentOutbound',
                path: {
                    shipmentId: shipmentId
                }
            });
            return shipment;
        } catch (error) {
            console.error('Error fetching shipment details:', error);
            return { shipment: {} };
        }
    }

    async getInventorySummaries() {
        try {
            if (!this.client) {
                return { inventorySummaries: [] };
            }
            const inventory = await this.client.callAPI({
                operation: 'getInventorySummaries',
                endpoint: 'fba/inventory',
                query: {
                    details: true,
                    MarketplaceIds: [process.env.AMAZON_MARKETPLACE_ID]
                }
            });
            return inventory;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return { inventorySummaries: [] };
        }
    }

    async createShipment(shipmentData) {
        try {
            if (!this.client) {
                return { shipment: {} };
            }
            const shipment = await this.client.callAPI({
                operation: 'createShipment',
                endpoint: 'fulfillmentOutbound',
                body: shipmentData
            });
            return shipment;
        } catch (error) {
            console.error('Error creating shipment:', error);
            return { shipment: {} };
        }
    }
}

module.exports = new AmazonApiClient();
