import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage = (props: RouteComponentProps<MatchParams>) => {
  const touristRouteId = props?.match?.params?.touristRouteId;
  return (
    <>
      <div>路由详情：{touristRouteId}</div>
    </>
  )
}