import { withRouter, RouteComponentProps } from "react-router-dom";
import { Image, Typography } from "antd";

interface PropType extends RouteComponentProps {
  id: number | string;
  size: "large" | "small";
  imageSrc: string;
  price: number | string;
  title: string
}

const ProductImageComponent = ({ id, size, imageSrc, price, title, history, location, match }: PropType) => {
  return (
    <div onClick={() => history.push(`detail/${id}`)}>
      {size === "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">
          {title.slice(0, 25)}
        </Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </div>
  )
}

export const ProductImage = withRouter(ProductImageComponent);