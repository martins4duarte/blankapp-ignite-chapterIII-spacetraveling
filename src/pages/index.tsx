import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Posts | Spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
              <a>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronizacao em vez de ciclos de vida.</p>
                <div className={styles.contentInfo}>
                  <div>
                    <img src="/images/date-icon.svg" alt="ignews" />
                    <time>15 Mar 2021</time>
                  </div>
                  <div>
                    <img src="/images/user-icon.svg" alt="ignews" />
                    <a>Joseph Oliveira</a>
                  </div>
                </div>
              </a>

              <a>
                <h1>Criando um app CRA do zero</h1>
                <p>Tudo sobre como criar a sua primeira aplicacao utilizando Create React App</p>
                <div className={styles.contentInfo}>
                  <div>
                    <img src="/images/date-icon.svg" alt="ignews" />
                    <time>19 Mar 2021</time>
                  </div>
                  <div>
                    <img src="/images/user-icon.svg" alt="ignews" />
                    <a>Danilo Oliveira</a>
                  </div>
                </div>
              </a>

              <a>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronizacao em vez de ciclos de vida.</p>
                <div className={styles.contentInfo}>
                  <div>
                    <img src="/images/date-icon.svg" alt="ignews" />
                    <time>15 Mar 2021</time>
                  </div>
                  <div>
                    <img src="/images/user-icon.svg" alt="ignews" />
                    <a>Joseph Oliveira</a>
                  </div>
                </div>
              </a>

              <a>
                <h1>Criando um app CRA do zero</h1>
                <p>Tudo sobre como criar a sua primeira aplicacao utilizando Create React App</p>
                <div className={styles.contentInfo}>
                  <div>
                    <img src="/images/date-icon.svg" alt="ignews" />
                    <time>19 Mar 2021</time>
                  </div>
                  <div>
                    <img src="/images/user-icon.svg" alt="ignews" />
                    <a>Danilo Oliveira</a>
                  </div>
                </div>
              </a>

              <a>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronizacao em vez de ciclos de vida.</p>
                <div className={styles.contentInfo}>
                  <div>
                    <img src="/images/date-icon.svg" alt="ignews" />
                    <time>15 Mar 2021</time>
                  </div>
                  <div>
                    <img src="/images/user-icon.svg" alt="ignews" />
                    <a>Joseph Oliveira</a>
                  </div>
                </div>
              </a>

          {/* { posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
              </a>
            </Link>
          ))} */}
        </div>

        <p className={styles.loadMoreButton}>
          Carregar mais posts
        </p>

      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
