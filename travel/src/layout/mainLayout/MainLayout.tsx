import { Footer, Header } from "../../components";
import styles from "./MainLayout.module.css";

export const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        {children}
      </div>
      <Footer />
    </>
  )
}