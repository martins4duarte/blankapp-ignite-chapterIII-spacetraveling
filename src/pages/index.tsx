import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';
import * as prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
import styles from './home.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { useState } from 'react';

interface Post {
  slug?: string;
  last_publication_date: string | null;
  title: string;
  subtitle: string;
  author: string;
  date: string;
}

interface PostPagination {
  posts: Post[];
  next_page: string;
}

interface HomeProps {
  postsPagination: PostPagination
}

export default function Home({ postsPagination }: HomeProps) {
  const [currentPosts, setCurrentPosts] = useState<Post[]>(postsPagination.posts);
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);

  async function handleSeeMorePosts() {
    try {
      const response = await fetch(nextPage)
      const data = await response.json()

      setNextPage(data.next_page)

      let morePosts = data.results.map(post => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          author: RichText.asText(post.data.author),
          subtitle: RichText.asText(post.data.subtitle),
          date: format(new Date(post.last_publication_date), 'dd.MMM.yyyy', { locale: ptBR }).replace(/\./g, ' ')
        }
      })

      setCurrentPosts([...currentPosts, ...morePosts])

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Posts | Spacetraveling</title>
      </Head>

      <main className={styles.container}>

        <img src="/images/logo.svg" alt="ignews" className={styles.headerImg}/>

        <div className={styles.posts}>
          {currentPosts.map(post => (
            <div className={styles.postContent} key={post.slug}>
              <Link href={`/post/${post.slug}`}>
                <h1 data-testid={post.slug}>{post.title}</h1>
              </Link>
              <p>{post.subtitle}</p>
              <div className={styles.contentInfo}>
                <span>
                  <FiCalendar color="#BBBBBB" size={20} />
                  <time>{post.date}</time>
                </span>
                <span>
                  <FiUser color="#BBBBBB" size={20} />
                  <a>{post.author}</a>
                </span>
              </div>
            </div>
          ))
          }
        </div>

        { nextPage 
          ?
            (
              <button
                className={styles.loadMoreButton}
                onClick={handleSeeMorePosts}
              >
                Carregar mais posts
              </button>
            )
          :
            (
              ""
            )
        }

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('posts', {
    pageSize: 1,
    orderings: {
      field: 'last_publication_date',
      direction: 'desc',
    },
  });


  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      author: RichText.asText(post.data.author),
      subtitle: RichText.asText(post.data.subtitle),
      date: format(new Date(post.last_publication_date), 'dd.MMM.yyyy', { locale: ptBR }).replace(/\./g, ' ')
    }
  })

  return {
    props: {
      postsPagination: {
        posts,
        next_page: postsResponse.next_page
      }
    }
  }

};
