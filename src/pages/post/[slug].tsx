import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom'
import { format } from 'date-fns';
import styles from './post.module.scss';
import ptBR from 'date-fns/locale/pt-BR';

interface IPostProps {
  first_publication_date: string | null;
  slug: string;
  title: string;
  banner: string;
  readingTime: string;
  author: string;
  date: Date;
  content: {
    heading: string;
    body: {
      text: string;
    }[];
  }[];
}

interface PostProps {
  post: IPostProps;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <main className={styles.container}>
        <img src="/images/Banner.png" alt={post.slug} width="100%" />

        <div className={styles.post}>
          <a>
            <h1>{post.title}</h1>

            <div className={styles.contentInfo}>
              <div>
                <img src="/images/date-icon.svg" alt="ignews" />
                <time>{post.date}</time>
              </div>
              <div>
                <img src="/images/user-icon.svg" alt="ignews" />
                <a>{post.author}</a>
              </div>
              <div>
                <img src="/images/clock-icon.svg" alt="ignews" />
                <a>{post.readingTime}</a>
              </div>
            </div>
          </a>

          <article className={styles.contentArticle}>
              {post.content.map(content => (
                <>
                  <h1>{content.heading}</h1>
                  <div dangerouslySetInnerHTML={{ __html: String(content.body)}}/>
                </>
              ))}
          </article>

        </div>
      </main>

      <div>

      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType(TODO);

  return {
    paths: [],
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    subtitle: RichText.asText(response.data.subtitle),
    author: RichText.asText(response.data.author),
    readingTime: RichText.asText(response.data.reading_time),
    banner: response.data.banner.url,
    date: format(new Date(response.last_publication_date), 'dd.MMM.yyyy', { locale: ptBR }).replace(/\./g, ' '), // format date, remove dots and add space
    content: response.data.content.map(content => {
      return {
        heading: RichText.asText(content.heading),
        body: RichText.asHtml(content.body)
      }
    }),
  }
  console.log(post)
  return {
    props: {
      post
    }
  }
};
