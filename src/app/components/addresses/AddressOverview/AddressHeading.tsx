import { useId } from "react"
import {
  Button,
  Dialog,
  Heading,
  LinkList,
  Paragraph,
  Row,
} from "@amsterdam/design-system-react"
import { SmallSkeleton } from "@/components/SmallSkeleton/SmallSkeleton"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import useOtherAddressesByBagId from "@/hooks/useOtherAddressesByBagId"
import { useBagAddress } from "../AddressHeader/useBagAddress"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

/**
 * The address as the heading of its page, with the other addresses on the
 * same postal code and house number (other house letters and suffixes).
 */
const AddressHeading: React.FC<Props> = ({ bagId }) => {
  const { address, isBusy } = useBagAddress(bagId)
  const [addresses] = useOtherAddressesByBagId(bagId)
  const dialogId = useId()

  const otherAddresses = (addresses ?? []).filter(
    ({ adresseerbaarobject_id }) => adresseerbaarobject_id !== bagId,
  )

  return (
    <Row align="between" alignVertical="center" wrap>
      {isBusy ? (
        <SmallSkeleton height={10} maxRandomWidth={300} />
      ) : (
        <Heading level={1}>{address?.weergavenaam ?? "Adres"}</Heading>
      )}
      {otherAddresses.length > 0 && (
        <>
          <Button
            variant="secondary"
            onClick={() => Dialog.open(`#${CSS.escape(dialogId)}`)}
          >
            Andere adressen ({otherAddresses.length})
          </Button>
          <Dialog
            id={dialogId}
            heading="Andere adressen"
            footer={
              <Button variant="secondary" onClick={Dialog.close}>
                Annuleren
              </Button>
            }
          >
            <Paragraph className="ams-mb-s">
              Op dit huisnummer zijn meer adressen, met een andere huisletter of
              toevoeging. Kies een adres om het te bekijken.
            </Paragraph>
            <LinkList>
              {otherAddresses.map(
                ({ adresseerbaarobject_id, weergavenaam }) => (
                  <LinkList.Link
                    key={adresseerbaarobject_id}
                    linkComponent={RouterLink}
                    href={`/adres/${adresseerbaarobject_id}`}
                    // The page stays; only the address changes.
                    onClick={(event) =>
                      event.currentTarget.closest("dialog")?.close()
                    }
                  >
                    {weergavenaam}
                  </LinkList.Link>
                ),
              )}
            </LinkList>
          </Dialog>
        </>
      )}
    </Row>
  )
}

export default AddressHeading
