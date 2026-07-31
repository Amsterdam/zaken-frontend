import { Spinner } from "@amsterdam/asc-ui";
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout";

export const LoadingScreen: React.FC = () => (
  <DefaultLayout>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Spinner size={36} />
    </div>
  </DefaultLayout>
);

export default LoadingScreen;
