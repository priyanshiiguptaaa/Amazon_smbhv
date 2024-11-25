export const countryRegulations = [
  {
    country: "United States",
    category: "import duties",
    lastUpdated: "2024-01-15",
    summary: "The United States has a complex system of import duties and regulations that vary by product category and country of origin.",
    details: [
      {
        title: "Import Duties",
        content: "Import duties in the US are calculated based on the Harmonized Tariff Schedule (HTS). Rates vary significantly by product type and country of origin.",
        rates: [
          "Most consumer goods: 0-37.5%",
          "Electronics: Generally 0-5%",
          "Textiles and Clothing: Up to 32%",
          "Duty-free under specific trade agreements"
        ]
      },
      {
        title: "Sales Tax",
        content: "The US does not have a federal VAT system, but states and localities may charge sales tax.",
        rates: [
          "State sales tax: 0-7.25%",
          "Local sales tax may apply",
          "Some states exempt certain categories"
        ]
      },
      {
        title: "Documentation Requirements",
        content: "Required documents include commercial invoice, bill of lading, packing list, and customs forms. Additional certificates may be required for specific products."
      }
    ],
    links: [
      {
        title: "U.S. Customs and Border Protection",
        url: "https://www.cbp.gov/trade"
      },
      {
        title: "Harmonized Tariff Schedule",
        url: "https://hts.usitc.gov/"
      }
    ]
  },
  {
    country: "European Union",
    category: "vat",
    lastUpdated: "2024-01-10",
    summary: "The EU has harmonized customs procedures across member states, but VAT rates and some regulations vary by country.",
    details: [
      {
        title: "Value Added Tax (VAT)",
        content: "VAT is applied to most goods and services. Rates vary by country and product category.",
        rates: [
          "Standard rates: 17-27%",
          "Reduced rates available for certain products",
          "Some items may be VAT exempt"
        ]
      },
      {
        title: "Import Duties",
        content: "The EU uses the Common Customs Tariff (CCT) for all member states.",
        rates: [
          "Average duty rate: 5.1%",
          "Electronics: 0-14%",
          "Textiles: 8-12%",
          "Preferential rates under trade agreements"
        ]
      }
    ],
    links: [
      {
        title: "European Commission - Taxation and Customs Union",
        url: "https://ec.europa.eu/taxation_customs/index_en"
      }
    ]
  },
  {
    country: "Japan",
    category: "customs",
    lastUpdated: "2024-01-05",
    summary: "Japan has specific import regulations and a consumption tax system. Many industrial goods have low or zero tariffs.",
    details: [
      {
        title: "Consumption Tax",
        content: "A national consumption tax applies to most goods and services.",
        rates: [
          "Standard rate: 10%",
          "Reduced rate: 8% for food and beverages"
        ]
      },
      {
        title: "Import Duties",
        content: "Tariff rates vary by product and country of origin. Many industrial products have zero or low rates.",
        rates: [
          "Industrial goods: 0-8%",
          "Agricultural products: Higher rates may apply",
          "Preferential rates under EPA agreements"
        ]
      }
    ],
    links: [
      {
        title: "Japan Customs",
        url: "https://www.customs.go.jp/english/"
      }
    ]
  },
  {
    country: "Australia",
    category: "restricted items",
    lastUpdated: "2024-01-01",
    summary: "Australia has strict biosecurity laws and specific import requirements. GST applies to most imported goods.",
    details: [
      {
        title: "Goods and Services Tax (GST)",
        content: "GST applies to most imported goods and services.",
        rates: [
          "Standard GST rate: 10%",
          "Some items may be GST-free"
        ]
      },
      {
        title: "Import Restrictions",
        content: "Australia has strict quarantine and biosecurity requirements. Certain items are prohibited or restricted.",
        rates: [
          "Food products: Special permits required",
          "Plant materials: Strict quarantine rules",
          "Personal effects: Declaration required"
        ]
      }
    ],
    links: [
      {
        title: "Australian Border Force",
        url: "https://www.abf.gov.au/"
      },
      {
        title: "Department of Agriculture, Water and the Environment",
        url: "https://www.agriculture.gov.au/biosecurity"
      }
    ]
  }
];
