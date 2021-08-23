import { RouteComponentProps } from "react-router-dom";
import { MainLayout } from "../../layout/mainLayout/MainLayout";

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage = (props: RouteComponentProps<MatchParams>) => {
  const touristRouteId = props?.match?.params?.touristRouteId;
  return (
    <>
      <MainLayout>
        <div>路由详情：{touristRouteId}</div>
      </MainLayout>
    </>
  )
}