import { useSession, signIn } from 'next-auth/client'
import { getStripeJs } from '../../services/stripe-js'
import api from '../../services/api'

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps){
  const [session] = useSession()

  async function handleSubscribe(){
    if(!session){
      signIn('github')
      return
    }

    try{
      const result = await api.post('/subscribe')

      const { sessionId } = result.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({
        sessionId
      })
    }catch(err){
      alert(err.message)
    }
  }

  return (
    <button
      onClick={handleSubscribe} 
      type="button" 
      className={styles.subscribeButton}>
      Subscribe Now
    </button>
  )
}