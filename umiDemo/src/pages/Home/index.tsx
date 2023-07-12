import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [count, setCount] = useState(0);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <button onClick={() => setCount(count + 1)}>{count}</button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
