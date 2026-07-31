import { useMemo } from "react";

export default (data?: components["schemas"]["Decos"]) => (
  useMemo(
    () => {
      const permits = data?.permits.filter(({ permit_granted }) => ["GRANTED", "NOT_GRANTED"].includes(permit_granted));
      if (permits === undefined || permits.length === 0) return undefined;
      return permits.reduce((acc, { permit_type, permit_granted }) => {
        acc[permit_type] = permit_granted === "GRANTED" ? "Ja" : "Nee";
        return acc;
      }, {} as Record<string, string>);
    }, [data],
  )
);