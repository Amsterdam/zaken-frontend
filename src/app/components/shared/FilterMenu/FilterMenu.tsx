import { type ReactNode } from "react";

const FilterMenu = ({ children }: { children: ReactNode }) => (
  <div style={{ background: "#f5f5f5", marginTop: 32, padding: "16px 24px" }}>
    {children}
  </div>
);

export default FilterMenu;
