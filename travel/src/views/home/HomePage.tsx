import { Col, Row, Typography } from "antd";
import styles from "./HomePage.module.css";
import { Header, Footer, SideMenu, Carousel, ProductCollection } from "../../components/index";
import { productList1, productList2, productList3 } from "../../assets/mock";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />

      <div className={styles['page-content']}>
        <Row style={{ paddingTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>

        <ProductCollection
          title={<Typography.Title level={3} type="warning">
            {t("home_page.hot_recommended")}
          </Typography.Title>}
          sideImage={sideImage}
          products={productList1}
        />

        <ProductCollection
          title={<Typography.Title level={3} type="danger">
            {t("home_page.new_arrival")}
          </Typography.Title>}
          sideImage={sideImage2}
          products={productList2}
        />

        <ProductCollection
          title={<Typography.Title level={3} type="success">
            {t("home_page.domestic_travel")}
          </Typography.Title>}
          sideImage={sideImage3}
          products={productList3}
        />
      </div>

      <Footer />
    </>
  )
}