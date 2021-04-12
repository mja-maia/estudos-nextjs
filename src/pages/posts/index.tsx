import Head from 'next/head'

import styles from './styles.module.scss'

export default function Posts(){
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>10 de Abril de 2021</time>
            <strong>Creating a Monorepo with Lerna  & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, 
              aspernatur rem eius aliquam porro 
              repellat error atque dolorum iusto soluta ut doloremque cumque 
              deleniti sed voluptatum debitis voluptate placeat nemo?
            </p>
          </a>
          <a href="#">
            <time>10 de Abril de 2021</time>
            <strong>Creating a Monorepo with Lerna  & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, 
              aspernatur rem eius aliquam porro 
              repellat error atque dolorum iusto soluta ut doloremque cumque 
              deleniti sed voluptatum debitis voluptate placeat nemo?
            </p>
          </a>
          <a href="#">
            <time>10 de Abril de 2021</time>
            <strong>Creating a Monorepo with Lerna  & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, 
              aspernatur rem eius aliquam porro 
              repellat error atque dolorum iusto soluta ut doloremque cumque 
              deleniti sed voluptatum debitis voluptate placeat nemo?
            </p>
          </a>
        </div>
      </main>
    </>
  )
}