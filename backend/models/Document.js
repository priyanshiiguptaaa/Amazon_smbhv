// In-memory document storage
const documents = [];

class Document {
    constructor(data) {
        this.id = data.id || Math.random().toString(36).substr(2, 9);
        this.user = data.user;
        this.shipment = data.shipment;
        this.type = data.type;
        this.name = data.name;
        this.description = data.description;
        this.fileUrl = data.fileUrl;
        this.status = data.status || 'pending';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    static create(data) {
        const doc = new Document(data);
        documents.push(doc);
        return doc;
    }

    static findById(id) {
        return documents.find(doc => doc.id === id);
    }

    static find(query = {}) {
        return documents.filter(doc => {
            for (let key in query) {
                if (doc[key] !== query[key]) return false;
            }
            return true;
        });
    }

    static update(id, data) {
        const index = documents.findIndex(doc => doc.id === id);
        if (index === -1) return null;
        
        const updated = { ...documents[index], ...data, updatedAt: new Date() };
        documents[index] = updated;
        return updated;
    }

    static delete(id) {
        const index = documents.findIndex(doc => doc.id === id);
        if (index === -1) return false;
        
        documents.splice(index, 1);
        return true;
    }
}

module.exports = Document;
