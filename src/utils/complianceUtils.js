// Mock compliance data
const countryRequirements = {
  US: {
    requiredDocs: ['Commercial Invoice', 'Packing List', 'FDA Prior Notice', 'Phytosanitary Certificate'],
    restrictions: ['Certain fruits require import permits', 'Must meet USDA standards'],
    customsForms: ['CBP Form 3461', 'CBP Form 7501']
  },
  EU: {
    requiredDocs: ['EUR.1 Movement Certificate', 'Packing List', 'Phytosanitary Certificate'],
    restrictions: ['Must comply with EU food safety regulations', 'Organic certification required if applicable'],
    customsForms: ['Single Administrative Document (SAD)', 'Export Accompanying Document (EAD)']
  }
};

export const getDocumentTemplates = (country) => {
  const templates = countryRequirements[country]?.requiredDocs.map(doc => ({
    name: doc,
    templateUrl: `https://api.cargoconnect.com/templates/${doc.toLowerCase().replace(/\s+/g, '-')}`
  })) || [];
  
  return templates;
};

export const validateCompliance = (documents, country) => {
  const required = new Set(countryRequirements[country]?.requiredDocs || []);
  const submitted = new Set(documents.map(doc => doc.type));
  
  const missing = [...required].filter(doc => !submitted.has(doc));
  return {
    compliant: missing.length === 0,
    missingDocs: missing,
    restrictions: countryRequirements[country]?.restrictions || []
  };
};

export const generateCustomsForms = async (orderDetails) => {
  const country = orderDetails.destination;
  const forms = countryRequirements[country]?.customsForms.map(form => ({
    formName: form,
    prefilledUrl: `https://api.cargoconnect.com/customs/${orderDetails.orderId}/${form.toLowerCase().replace(/\s+/g, '-')}`
  })) || [];
  
  return forms;
};
