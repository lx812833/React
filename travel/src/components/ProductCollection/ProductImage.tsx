import { withRouter, RouteComponentProps, Link } from "react-router-dom";
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
    /**
     * 使用history方式导航
     * <div onClick={() => history.push(`detail/${id}`)}></div>
     */

    /**
     * 使用Link to 方式导航
     * 转换为 a标签，可以鼠标右键新开窗口
     */
    <Link to={`detail/${id}`}>
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
    </Link>
  )
}

export const ProductImage = withRouter(ProductImageComponent);