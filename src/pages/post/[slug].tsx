import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ slug }) {

  console.log("Teste");

  return (
    <>
      <main className={styles.container}>
        <img src="/images/Banner.png" alt={slug} width="100%"/>

        <div className={styles.post}>
          <a>
            <h1>Criando um app CRA do zero</h1>
            <div className={styles.contentInfo}>
                <div>
                  <img src="/images/date-icon.svg" alt="ignews" />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <img src="/images/user-icon.svg" alt="ignews" />
                  <a>Joseph Oliveira</a>
                </div>
                <div>
                  <img src="/images/clock-icon.svg" alt="ignews" />
                  <a>4 min</a>
                </div>
                
            </div>
          </a>
        </div>
      </main>

      <div>

      </div>
    </>
  )
}

// export const getStaticPaths = async () => {
//   // const prismic = getPrismicClient({});
//   // const posts = await prismic.getByType(TODO);

//   return {
//     paths: [],
//     fallback: 'blocking'
//   }
// };

// export const getStaticProps = async ({ params }) => {
//   const { slug } = params;
//   // const prismic = getPrismicClient({});
//   // const response = await prismic.getByUID(TODO);

//   return {
//     props: {
//       slug
//     }
//   }
// };
