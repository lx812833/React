import { Col, Row } from "antd";
import styles from "./App.module.css";
import { Header, Footer, SideMenu, Carousel } from "./components/index";

function App() {
  return (
    <div className={styles.App}>
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
      </div>

      <Footer />
    </div>
  );
}

export default App;
