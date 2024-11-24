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

import axios from 'axios';

// Document Validation
export const validateDocument = async (document) => {
  try {
    const validationRules = await getCountryRegulations(document.destination);
    const validationResults = {
      isValid: true,
      errors: [],
      warnings: [],
      expiryDate: null,
      requiredSignatures: [],
      missingFields: []
    };

    // Check document type requirements
    if (!validationRules.requiredDocuments.includes(document.type)) {
      validationResults.errors.push(`Document type ${document.type} not accepted for ${document.destination}`);
      validationResults.isValid = false;
    }

    // Check expiry date
    if (document.expiryDate) {
      const expiry = new Date(document.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry < 0) {
        validationResults.errors.push('Document has expired');
        validationResults.isValid = false;
      } else if (daysUntilExpiry < 30) {
        validationResults.warnings.push(`Document expires in ${daysUntilExpiry} days`);
      }
      validationResults.expiryDate = document.expiryDate;
    }

    return validationResults;
  } catch (error) {
    console.error('Error validating document:', error);
    throw error;
  }
};

// Get Country-specific Regulations
export const getCountryRegulations = async (countryCode) => {
  try {
    // Mock regulations data (replace with actual API call)
    return {
      country: countryCode,
      requiredDocuments: [
        'commercial_invoice',
        'packing_list',
        'bill_of_lading',
        'certificate_of_origin',
        'phytosanitary_certificate'
      ],
      restrictions: [
        'Must maintain temperature below 8°C',
        'Requires fumigation certificate',
        'Organic certification required'
      ],
      customsDuties: {
        rate: 0.15,
        specialProvisions: ['Preferential rate under FTA'],
        documentation: ['Form A', 'EUR1']
      },
      importLicense: {
        required: true,
        validity: '12 months',
        process: 'Apply through single window system'
      },
      packaging: {
        requirements: [
          'Use food-grade materials',
          'Temperature monitoring indicators required',
          'Country of origin marking mandatory'
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching country regulations:', error);
    throw error;
  }
};

// Certificate Management
export const manageCertificates = async (companyId) => {
  try {
    return {
      activeCertificates: [
        {
          type: 'ISO 22000',
          number: 'ISO22-2023-1234',
          issueDate: '2023-01-15',
          expiryDate: '2024-01-14',
          status: 'Active',
          issuer: 'SGS'
        },
        {
          type: 'HACCP',
          number: 'HACCP-2023-5678',
          issueDate: '2023-03-20',
          expiryDate: '2024-03-19',
          status: 'Active',
          issuer: 'Bureau Veritas'
        }
      ],
      pendingRenewals: [
        {
          type: 'Organic Certification',
          expiryDate: '2023-12-31',
          renewalProcess: 'Initiate 3 months before expiry',
          estimatedCost: 1200
        }
      ],
      requiredCertificates: [
        'GLOBALG.A.P',
        'Fair Trade',
        'Rainforest Alliance'
      ]
    };
  } catch (error) {
    console.error('Error managing certificates:', error);
    throw error;
  }
};

// Compliance Check
export const checkCompliance = async (shipment) => {
  try {
    const regulations = await getCountryRegulations(shipment.destination);
    const certificates = await manageCertificates(shipment.companyId);
    
    return {
      isCompliant: true,
      checkResults: [
        {
          category: 'Documentation',
          status: 'Complete',
          missing: [],
          action: 'None required'
        },
        {
          category: 'Certificates',
          status: 'Attention Required',
          missing: ['GLOBALG.A.P'],
          action: 'Apply for GLOBALG.A.P certification'
        },
        {
          category: 'Product Requirements',
          status: 'Compliant',
          missing: [],
          action: 'Maintain temperature logs'
        }
      ],
      recommendations: [
        'Schedule GLOBALG.A.P audit within 30 days',
        'Update temperature monitoring system',
        'Prepare for annual ISO audit'
      ]
    };
  } catch (error) {
    console.error('Error checking compliance:', error);
    throw error;
  }
};

// Digital Signature Verification
export const verifyDigitalSignature = async (document) => {
  try {
    // Mock signature verification (replace with actual cryptographic verification)
    return {
      isValid: true,
      signedBy: 'John Doe',
      signedAt: '2023-10-15T14:30:00Z',
      certificate: {
        issuer: 'DigiCert',
        validUntil: '2024-10-14T23:59:59Z',
        status: 'Valid'
      },
      audit: {
        ipAddress: '192.168.1.1',
        device: 'Chrome/Windows',
        location: 'New Delhi, India'
      }
    };
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw error;
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
