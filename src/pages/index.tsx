import { PageHeader } from '../components/PageHeader';
import { LastPictures } from '../components/LastPictures';
import { PictureMenu } from '../components/PictureMenu';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader />
      <div className={styles.main}>
        <LastPictures />
        <PictureMenu />
      </div>
    </div>
  );
}
