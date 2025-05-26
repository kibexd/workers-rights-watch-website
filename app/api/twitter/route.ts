import { NextResponse } from 'next/server'

//const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEMg2AEAAAAApZw2jPYkHa4c3DwbwHJt52fWUc8%3DIc81cnTB3uYuj1cYDn9s69quq9f7K7cNDb4znZ3W98jMfm7MJh'
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN!
const TWITTER_USERNAME = 'Workersrights24'

export async function GET() {
  try {
    // Step 1: Get user ID from username
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    )

    if (!userRes.ok) {
      const err = await userRes.json()
      console.error('User fetch error:', err)
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }

    const userData = await userRes.json()
    const userId = userData.data.id

    // Step 2: Fetch tweets for that user ID
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,text,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    )

    if (!tweetsRes.ok) {
      const err = await tweetsRes.json()
      console.error('Tweets fetch error:', err)
      return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
    }

    const tweets = await tweetsRes.json()
    return NextResponse.json(tweets)
  } catch (error) {
    console.error('Twitter route error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 