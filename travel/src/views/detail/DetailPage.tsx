import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage = (props: RouteComponentProps<MatchParams>) => {
  const { match } = props;
  return (
    <>
      <div>路由详情：{match}</div>
      <div>路由详情222：{match.params.touristRouteId}</div>
    </>
  )
}