import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';
import * as prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
import styles from './home.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Post {
  slug?: string;
  last_publication_date: string | null;
  title: string;
  subtitle: string;
  author: string;
  date: string;
}

interface PostPagination {
  next_page: string;
  posts: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: PostPagination) {
  return (
    <>
      <Head>
        <title>Posts | Spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {{ posts.map(post => (
              <Link href={`/post/${post.slug}`} key={post.slug}>
                <a>
                  <h1>{post.title}</h1>
                  <p>{post.subtitle}</p>
                  <div className={styles.contentInfo}>
                    <div>
                      <img src="/images/date-icon.svg" alt="date-icon" />
                      <time>{post.date}</time>
                    </div>
                    <div>
                      <img src="/images/author-icon.svg" alt="author-icon" />
                      <a>{post.author}</a>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          }}
        </div>

        <p className={styles.loadMoreButton}>
          Carregar mais posts
        </p>

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismicClient = getPrismicClient({});

  const response = await prismicClient.get({
    predicates: [
      prismic.predicate.at("document.type", "posts")
    ],
    fetch: ['Posts.title', 'Posts.content', 'Posts.author'],
    pageSize: 1,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      author: RichText.asText(post.data.author),
      subtitle: RichText.asText(post.data.subtitle),
      date: format(new Date(post.last_publication_date), 'dd.MMM.yyyy', { locale: ptBR }).replace(/\./g, ' ')
    }
  })

  console.log(posts)
  return {
    props: {
      posts
    }
  }

};
