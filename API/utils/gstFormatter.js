exports.formatGstDetails = (data) => ({
  referenceId: data.reference_id,
  gstin: data.GSTIN,
  legalName: data.legal_name_of_business,
  tradeName: data.trade_name_of_business,
  centerJurisdiction: data.center_jurisdiction,
  stateJurisdiction: data.state_jurisdiction,
  registrationDate: data.date_of_registration,
  constitutionOfBusiness: data.constitution_of_business,
  taxpayerType: data.taxpayer_type,
  status: data.gst_in_status,
  lastUpdated: data.last_update_date,
  natureOfBusiness: data.nature_of_business_activities,
  principalAddress: data.principal_place_address,
  principalSplitAddress: data.principal_place_split_address,
  additionalAddresses: data.additional_address_array,
  valid: data.valid,
  message: data.message
});
