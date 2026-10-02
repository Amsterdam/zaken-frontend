import { useEffect, useState } from "react";
import { useModal } from "app/components/shared/Modal/hooks/useModal";
import { useCorporations, useSetCaseData, useUpdateAddress } from "@/api/hooks";
import ChangeableItem from "../ChangeableItem/ChangeableItem";
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal";
import ChangeHousingCorporationForm from "./ChangeHousingCorporationForm";
import { SpinnerWrapper } from "app/components/shared/loading";

type Props = {
  housingCorporationId?: components["schemas"]["HousingCorporation"]["id"] | null
  bagId: components["schemas"]["Address"]["bag_id"]
  caseId: components["schemas"]["Case"]["id"]
}

const ChangeHousingCorporation: React.FC<Props> = ({ housingCorporationId, bagId, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [housingCorporations, setHousingCorporations] = useState<components["schemas"]["HousingCorporation"][]>([]);
  const setCaseData = useSetCaseData(caseId);
  const { data } = useCorporations();
  const { mutate: updateAddress, isPending } = useUpdateAddress(bagId);

  useEffect(() => {
    if (data?.results) {
      // Add a null option for no housing corporation.
      const corporations: any = [...data.results];
      corporations.push({ id: null, name: "Geen corporatie" });
      setHousingCorporations(corporations);
    }
  }, [data?.results]);

  const onSubmit = (housing_corporation?: components["schemas"]["HousingCorporation"]["id"] | null) => {
    updateAddress(
      { housing_corporation },
      {
        onSuccess: (address) => {
          // Show the new housing corporation on the case right away.
          setCaseData((caseItem) => ({
            ...caseItem,
            address: {
              ...caseItem.address,
              housing_corporation: address.housing_corporation,
            },
          }));
        },
        onSettled: closeModal,
      },
    );
  };

  return (
    <>
      <ChangeableItem
        name={ housingCorporations.find((corporation) => corporation.id === housingCorporationId)?.name }
        titleAccess="Wijzig de woningcorporatie"
        onClick={ openModal }
      />
      <Modal
        isOpen={ isModalOpen }
        onClose={ closeModal }
        title="Wijzig woningcorporatie"
      >
        <SpinnerWrapper spinning={ isPending }>
          <ModalBlock>
            <ChangeHousingCorporationForm
              onSubmit={ onSubmit }
              onCancel={ closeModal }
              housingCorporations={ housingCorporations }
              housingCorporationId={ housingCorporationId }
            />
          </ModalBlock>
        </SpinnerWrapper>
      </Modal>
    </>
  );
};

export default ChangeHousingCorporation;
