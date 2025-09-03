import { BusinessPartnerDetails } from './_components/BusinessPartnerDetails'

export default function NgbluWorkspacePage() {
  // In a real implementation, you would get this from the URL params or context
  const businessPartnerId = '1'

  return <BusinessPartnerDetails businessPartnerId={businessPartnerId} />
}
